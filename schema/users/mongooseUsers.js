const check = require("validator");
const { Schema } = require("mongoose");
const { subscription } = require("../../consts");

const mongooseUserShema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => check.isEmail(value),
        message: "Email has wrong format",
      },
    },
    subscription: {
      type: String,
      enum: subscription,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongooseUserShema;
