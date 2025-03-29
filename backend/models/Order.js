const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "on_delivery", "balance"],
    },
    billingData: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone_number: { type: String, required: true },
      address: { type: String, required: true },
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
