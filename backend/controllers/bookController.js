const Book = require("../models/Book");

const addBook = async (req, res) => {
  try {
    const { title, author, description, coverImage, price, ISBN } = req.body;

    if (!title || !author || !coverImage || !price || !ISBN) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = await Book.create({
      title,
      ISBN,
      author,
      description,
      publisher: req.user.id,
      coverImage,
      price,
      status: "waiting",
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserBooks = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const books = await Book.find({ publisher: req.user.id });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getBooks = async (req, res) => {
  try {
    let books;

    if (req.user.role === "admin") {
      books = await Book.find();
    } else {
      books = await Book.find({
        publisher: { $ne: req.user.id },
        status: "ready",
        inCart: false,
      });
    }

    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editBook = async (req, res) => {
  const { bookId } = req.params;
  const updates = req.body;

  try {
    let book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (req.user.role === "admin") {
      const updatedBook = await Book.findByIdAndUpdate(bookId, updates, {
        new: true,
      });
      return res.status(200).json(updatedBook);
    }

    if (book.publisher.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only edit your own books" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { ...updates, status: "waiting" },
      {
        new: true,
      }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (
      req.user.role !== "admin" &&
      book.publisher.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "You can only delete your own books" });
    }

    await book.deleteOne();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};

const getBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (
      book.status === "ready" ||
      book.publisher.toString() === req.user.id ||
      req.user.role === "admin"
    ) {
      return res.json(book);
    }

    res
      .status(403)
      .json({ message: "You are not authorized to view this book" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching book" });
  }
};

module.exports = {
  addBook,
  getUserBooks,
  getBooks,
  editBook,
  deleteBook,
  getBook,
};
