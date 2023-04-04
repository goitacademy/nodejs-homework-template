const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minLength: [7, "Number is too short!"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email format",
      ],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: String,
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("user", schema);

module.exports = {
  User,
};
