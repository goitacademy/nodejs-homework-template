const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../helpers/handleMongooseError");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minLength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegex,
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
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegex)).required().messages({
    "any.required": `Missing required email field`,
  }),

  password: Joi.string().min(6).required().messages({
    "any.required": `Missing required password field`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegex)).required().messages({
    "any.required": `Missing required email field`,
  }),

  password: Joi.string().min(6).required().messages({
    "any.required": `Missing required password field`,
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegex)).required().messages({
    "any.required": `Missing required email field`,
  }),

  password: Joi.string().min(6).required().messages({
    "any.required": `Missing required password field`,
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
