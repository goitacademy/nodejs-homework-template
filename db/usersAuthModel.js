const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const userScheme = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
  },
});

userScheme.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
    this.avatarURL = gravatar.url(
      `${this.email}`,
      { protocol: "https", s: "250" },
      true
    );
  }
});

const User = mongoose.model("user", userScheme);

module.exports = {
  User,
};
