const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.pdgwLL8oxjSs9n4AV66x5wHaHa?rs=1&pid=ImgDetMain",
    },
    address: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    balance: { type: Number, default: 0 },
    pendingBalance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
