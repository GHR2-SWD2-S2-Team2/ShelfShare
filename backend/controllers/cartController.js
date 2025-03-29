const Cart = require("../models/Cart");
const Book = require("../models/Book");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("books");
    if (!cart) return res.json({ books: [] });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

const addToCart = async (req, res) => {
  const { bookId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.status !== "ready") {
      return res
        .status(400)
        .json({ message: "Book is not available for purchase" });
    }

    if (book.publisher.toString() === req.user.id) {
      return res
        .status(400)
        .json({ message: "Why you try to buy your book!!!!!!" });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, books: [bookId] });
    } else {
      if (cart.books.includes(bookId)) {
        return res.status(400).json({ message: "Book already in the cart" });
      } else if (book.inCart) {
        return res
          .status(400)
          .json({ message: "Book is not available for purchase" });
      }
      cart.books.push(bookId);
    }

    await cart.save();
    book.inCart = true;
    await book.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
};

const removeFromCart = async (req, res) => {
  const { bookId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    if (!cart.books.includes(bookId)) {
      return res.status(400).json({ message: "This book is not in your cart" });
    }

    cart.books = cart.books.filter((id) => id.toString() !== bookId);
    await cart.save();

    await Book.findByIdAndUpdate(bookId, { inCart: false });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item" });
  }
};

const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart" });
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
