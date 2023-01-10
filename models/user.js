const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL:{
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = User;
