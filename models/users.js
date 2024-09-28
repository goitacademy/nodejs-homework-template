const { Schema, model } = require("mongoose");
const { handleSaveError } = require("../models/hooks");
const gravatar = require("gravatar");
const { emailRegexp } = require("../constants/email-constants");

const avatar = gravatar.url(
  "emerleite@gmail.com",
  { s: "250", r: "x", d: "retro" },
  true
);

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    avatarLink: {
      type: String,
      default: "",
    },
    avatarPublickId: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: avatar,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
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
userSchema.post("save", handleSaveError);

const User = model("user", userSchema);

module.exports = User;
