const express = require("express");
const { protect } = require("../controllers/authController");
const {
  createOrder,
  getUserOrders,
  orderCompleted,
  cancelOrder,
  createCheckOut,
  verifyPayment,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/new", protect, createOrder);
router.post("/stripe", protect, createCheckOut);
router.get("/verify-payment", verifyPayment);
router.get("/", protect, getUserOrders);
router.patch("/cancel/:orderId", protect, cancelOrder);
router.patch("/complete/:orderId", protect, orderCompleted);

module.exports = router;
