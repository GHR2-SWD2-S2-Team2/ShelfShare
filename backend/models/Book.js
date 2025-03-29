const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    ISBN: { type: String, required: true },
    description: { type: String },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coverImage: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["waiting", "ready", "rejected", "ordered", "sold"],
      default: "waiting",
    },
    inCart: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

BookSchema.index({ publisher: 1, title: 1 }, { unique: true });
module.exports = mongoose.model("Book", BookSchema);
