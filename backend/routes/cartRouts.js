const express = require("express");

const { protect } = require("../controllers/authController");
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const router = express.Router();

router.get("/", protect, getCart);
router.post("/book", protect, addToCart);
router.delete("/book/:bookId", protect, removeFromCart);
router.delete("/clear", protect, clearCart);

module.exports = router;
