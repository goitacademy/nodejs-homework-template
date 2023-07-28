const { Schema, model } = require("mongoose");
const { handleSaveError } = require("../models/hooks");

const { emailRegexp } = require("../constants/email-constants");

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
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSaveError);

const User = model("user", userSchema);

module.exports = User;
