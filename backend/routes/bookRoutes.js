const express = require("express");
const {
  addBook,
  getUserBooks,
  getBooks,
  editBook,
  deleteBook,
  getBook,
} = require("../controllers/bookController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.get("/", protect, getBooks);
router.get("/myBooks", protect, getUserBooks);
router.post("/add", protect, addBook);
router.get("/:bookId", protect, getBook);
router.patch("/:bookId", protect, editBook);
router.delete("/:bookId", protect, deleteBook);

module.exports = router;
