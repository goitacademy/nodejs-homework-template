const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { string } = require("joi");

const userSchema = Schema(
  {
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
    logout: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joyRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = { User, joyRegisterSchema };
