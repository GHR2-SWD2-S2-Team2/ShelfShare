const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = { id: user.id, role: user.role };
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const register = async (req, res) => {
  try {
    const { name, email, password, address, img, phone } = req.body;
    const obj = {};
    if (img) obj.img = img;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    if (!email || !password || !name || !address || !phone)
      res.status(400).json({
        message: "messing fields",
      });

    const user = await User.create({
      name,
      email,
      password,
      address,
      phone,
      ...obj,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        token: generateToken(user.id),
        name,
        email,
        address,
        img,
        phone,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      img: user.img,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

module.exports = { protect, login, register };
