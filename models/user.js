const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils/index");

const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const subscriptionList = ["starter", "pro", "business"];
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": `name should be a type of 'text'`,
    "string.empty": `name cannot be an empty field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": `email should be a type of 'text'`,
    "string.empty": `email cannot be an empty field`,
    "string.pattern.base": `email not valid`,
    "any.required": `missing required email field`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": `password should be a type of 'text'`,
    "string.empty": `password cannot be an empty field`,
    "string.min": `password must be at least 6 characters long`,
    "any.required": `missing required password field`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": `email should be a type of 'text'`,
    "string.empty": `email cannot be an empty field`,
    "string.pattern.base": `email not valid`,
    "any.required": `missing required email field`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": `password should be a type of 'text'`,
    "string.empty": `password cannot be an empty field`,
    "string.min": `password must be at least 6 characters long`,
    "any.required": `missing required password field`,
  }),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required().messages({
      "any.only": `the subscription field has an invalid value`, 
      "any.required": `missing required subscription field`,
    }),
  });

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};