const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userShema = new mongoose.Schema({
  password: { type: String, required: [true, "Password is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  avatarURL: { type: String },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: { type: String, default: null },
});

userShema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("user", userShema);

module.exports = {
  User,
};
