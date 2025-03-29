const { default: axios } = require("axios");
const Book = require("../models/Book");
const User = require("../models/User");

const updateBookStatusAndSellerBalance = async (order) => {
  const bulkBookUpdates = [],
    bulkSellerUpdates = [];
  for (const bk of order.books) {
    const book = await Book.findById(bk);

    if (book) {
      bulkBookUpdates.push({
        updateOne: {
          filter: { _id: book._id },
          update: { $set: { status: "ready", inCart: false } },
        },
      });
      bulkSellerUpdates.push({
        updateOne: {
          filter: { _id: book.publisher },
          update: { $inc: { pendingBalance: -book.price } },
        },
      });
    }
  }

  if (bulkBookUpdates.length) await Book.bulkWrite(bulkBookUpdates);
  if (bulkSellerUpdates.length) await User.bulkWrite(bulkSellerUpdates);
};

const addPendingBlanceToSeller = async (order) => {
  const books = await Book.find({ _id: { $in: order.books } });
  if (!books.length) return;
  const bulkBookUpdates = books.map((book) => ({
    updateOne: {
      filter: { _id: book._id },
      update: { $set: { status: "ordered", inCart: false } },
    },
  }));

  const bulkSellerUpdates = books.map((book) => ({
    updateOne: {
      filter: { _id: book.publisher },
      update: { $inc: { pendingBalance: book.price } },
    },
  }));

  await Promise.all([
    Book.bulkWrite(bulkBookUpdates),
    User.bulkWrite(bulkSellerUpdates),
  ]);
};

module.exports = {
  updateBookStatusAndSellerBalance,
  addPendingBlanceToSeller,
};
