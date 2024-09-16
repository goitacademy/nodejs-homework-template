const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, minLength: 1, maxLength: 32, required: true },
    surname: { type: String, minLength: 1, maxLength: 32, required: true },
    phone: { type: Number, required: true },
    email: { type: String, maxLength: 50, required: true },
    favorite: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("user", userSchema, "users");

module.exports = User;
