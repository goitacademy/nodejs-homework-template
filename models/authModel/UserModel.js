const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const emailRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      match: emailRegExp,
      required: [true, "Email is required"],
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      minLengtht: 8,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
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

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
