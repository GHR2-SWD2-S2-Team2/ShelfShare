const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CartSchema.virtual("totalPrice").get(function () {
  if (!this.populated("books")) {
    return undefined;
  }
  return this.books.reduce((total, book) => total + book.price, 0);
});

module.exports = mongoose.model("Cart", CartSchema);
