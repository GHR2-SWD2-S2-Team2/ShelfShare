const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const cartRouts = require("./routes/cartRouts");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRouts);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
