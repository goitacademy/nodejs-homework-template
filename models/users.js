const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
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
    default: null,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
  verify: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("User", usersSchema);
