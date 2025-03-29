const User = require("../models/User");

const updateUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.img = req.body.img || user.img;
    user.address = req.body.address || user.address;
    user.phone = req.body.phone || user.phone;
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      img: updatedUser.img,
      address: updatedUser.address,
      phone: updatedUser.phone,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = user.toObject();
    if (user.role !== "admin") {
      delete userData.role;
    }
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user info" });
  }
};

module.exports = {
  updateUserProfile,
  getUserInfo,
};
