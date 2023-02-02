const { Schema, model } = require("mongoose");
const Joi = require("joi");
const emailRegex = /^[a-zA0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [emailRegex, "Please enter a valid email"],
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const registerSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegex)
    .required()
    .messages({ "any.required": "Email is invalid" }),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = { User, registerSchema, loginSchema, subscriptionSchema };
