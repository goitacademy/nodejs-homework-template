const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
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
  // додавання моделі токену
  token: String,
  // модель аватарки
  avatarURL: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
