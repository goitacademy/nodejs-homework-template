const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userShema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: { type: String, required: [true, "Password is required"] },
  balance: { type: Number, default: 0 },
  deposits: { type: Array },
  games: { type: Array },
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
