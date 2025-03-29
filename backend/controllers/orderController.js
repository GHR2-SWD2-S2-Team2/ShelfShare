const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Book = require("../models/Book");
const User = require("../models/User");
const {
  updateBookStatusAndSellerBalance,
  addPendingBlanceToSeller,
} = require("../helpers/Payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createOrder = async (req, res) => {
  const { paymentMethod } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "books",
      populate: { path: "publisher" },
    });

    if (!cart || cart.books.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cart.totalPrice;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const billing_data = {
      name: user.name,
      email: user.email,
      phone_number: user.phone || "NA",
      address: user.address || "NA",
      city: "NA",
      country: "EG",
    };

    if (paymentMethod === "balance" && totalPrice > user.balance) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const order = await Order.create({
      user: req.user.id,
      books: cart.books.map((book) => book._id),
      totalPrice,
      status: "pending",
      paymentMethod,
      billingData: billing_data,
    });

    if (paymentMethod === "balance") {
      if (user.balance >= totalPrice) {
        user.balance -= totalPrice;
        await user.save();
        await addPendingBlanceToSeller(order);
        order.paid = true;
        await order.save();
        await Cart.findOneAndUpdate({ user: req.user.id }, { books: [] });
        return res
          .status(201)
          .json({ message: "Order paid from balance", order });
      } else {
        return res.status(400).json({ message: "Insufficient balance" });
      }
    }

    if (paymentMethod === "on_delivery") {
      await addPendingBlanceToSeller(order);
      await Cart.findOneAndUpdate({ user: req.user.id }, { books: [] });
      return res
        .status(201)
        .json({ message: "Order placed, pay on delivery", order });
    }

    return res.status(400).json({ message: "Invalid payment method" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

const createCheckOut = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "books",
      populate: { path: "publisher" },
    });

    if (!cart || cart.books.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const line_items = cart.books.map((book) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: book.title,
          images: [book.coverImage],
        },
        unit_amount: Math.round(book.price * 2), //egp => usd in cents (1 usd = 50 egp) 1/50*100 = 1*2
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url:
        "http://localhost:5000/api/order/verify-payment?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5000/faild",
      client_reference_id: req.user.id,
      metadata: {
        totalPrice: cart.totalPrice.toString(),
      },
    });
    res.json({ id: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const verifyPayment = async (req, res) => {
  let session;
  try {
    const sessionId = req.query.session_id;
    if (!sessionId) {
      return res.status(400).json({ message: "No session_id provided" });
    }
    session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Error retrieving Stripe session", error: e.message });
  }

  try {
    const cart = await Cart.findOne({
      user: session.client_reference_id,
    }).populate({
      path: "books",
      populate: { path: "publisher" },
    });

    if (!cart || cart.books.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cart.totalPrice;

    if (parseFloat(session.metadata.totalPrice) !== totalPrice) {
      return res.status(400).json({ message: "Payment amount mismatch" });
    }

    const user = await User.findById(session.client_reference_id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const billing_data = {
      name: user.name,
      email: user.email,
      phone_number: user.phone || "NA",
      address: user.address || "NA",
      city: "NA",
      country: "EG",
    };

    const order = await Order.create({
      user: session.client_reference_id,
      books: cart.books.map((book) => book._id),
      totalPrice,
      status: "pending",
      paymentMethod: "card",
      billingData: billing_data,
      paid: true,
    });

    await addPendingBlanceToSeller(order);
    await Cart.deleteOne({ user: session.client_reference_id });

    return res
      .status(200)
      .json({ message: "Payment verified and order processed", order });
  } catch (err) {
    console.error("Error processing order:", err);
    return res
      .status(500)
      .json({ message: "Error processing order", error: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === "admin") {
      orders = await Order.find().sort({
        createdAt: -1,
      });
    } else {
      orders = await Order.find({ user: req.user.id }).sort({
        createdAt: -1,
      });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending orders can be canceled" });
    }

    order.status = "canceled";
    await updateBookStatusAndSellerBalance(order);
    if (order.paid) {
      order.paid = false;
      const user = await User.findById(req.user.id);
      if (user) {
        user.balance += order.totalPrice;
        await user.save();
      }
    }
    await order.save();

    res.status(200).json({ message: "Order canceled successfully", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error canceling order", error: error.message });
  }
};

const orderCompleted = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const order = await Order.findById(req.params.orderId).populate("books");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "completed") {
      return res.status(200).json({ message: "Order already completed" });
    }

    for (const book of order.books) {
      await User.findByIdAndUpdate(book.publisher, {
        $inc: { balance: book.price, pendingBalance: -book.price },
      });
    }

    order.status = "completed";
    await order.save();

    res.status(200).json({ message: "Order marked as completed", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};

module.exports = {
  createOrder,
  createCheckOut,
  getUserOrders,
  cancelOrder,
  orderCompleted,
  verifyPayment,
};
