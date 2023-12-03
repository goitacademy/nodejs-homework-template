const mongoose = require("mongoose");

const userSchemas = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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
    // булевое значение для логина. Подтвердил пользователь свою почту или нет
    verify: {
      type: Boolean,
      default: false,
    },
    // токен верификации
    verificationToken: {
      type: String,
      default: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("User", userSchemas);
