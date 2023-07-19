const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const Joi = require("joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
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
    token: String,
  },
  { versionKeye: false }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "Missing required password field",
  }),

  email: Joi.string().required().messages({
    "any.required": "Missing required email field",
  }),

  subscription: Joi.string().messages({
    "any.required": "Missing required subscription field",
  }),
});

const loginSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "Missing required password field",
  }),

  email: Joi.string().required().messages({
    "any.required": "Missing required email field",
  }),

  subscription: Joi.string().messages({
    "any.required": "Missing required subscription field",
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
