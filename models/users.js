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
    avatarUrl: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});
const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});
const User = model("user", userSchema);

module.exports = { User, joiSchema, subscriptionJoiSchema };
