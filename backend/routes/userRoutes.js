const express = require("express");
const {
  updateUserProfile,
  getUserInfo,
} = require("../controllers/userController");
const { protect } = require("../controllers/authController");
const User = require("../models/User");
const router = express.Router();

router.get("/me", protect, getUserInfo);
router.patch("/", protect, updateUserProfile);
module.exports = router;
