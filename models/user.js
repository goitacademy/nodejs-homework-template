const { Schema, model } = require("mongoose");
const gravatar = require("gravatar");
const { handleSaveError } = require("./hooks");

const emailRegexp = /^\w+(\.-?\w+)*@\w+(\.-?\w+)*(\.\w{2,3})+$/;

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
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: { type: String, default: "" },
    avatarURL: { type: String, required: true },
    avatarImage: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleSaveError);

const User = model("user", userSchema);

module.exports = User;
