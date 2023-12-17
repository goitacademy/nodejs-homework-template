const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const Joi = require("joi");

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// mongoose user model validate
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
      match: emailRegExp,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: false }
);

// validate user's fields
const loginSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .required()
    .pattern(emailRegExp)
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .required()
    .min(6)
    .messages({ "any.required": "missing required password field" }),
});

const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .message({ "any.required": "missing required name field" }),
  email: Joi.string()
    .min(6)
    .required()
    .pattern(emailRegExp)
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .required()
    .min(6)
    .messages({ "any.required": "missing required password field" }),
});

const schemas = {
  registerSchema,
  loginSchema,
};

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = { User, schemas };
