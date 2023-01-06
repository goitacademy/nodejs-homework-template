const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 6, required: true },
    token: { type: String, default: null },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = User;
