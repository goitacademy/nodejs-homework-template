const { Schema, model } = require("mongoose");
const joi = require("joi");

const { handleSaveErrors } = require("../helpers");
const Joi = require("joi");
const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z/]{2,3}$/;
const userSchema = new Schema(
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

    token: {
      type: String,
      default: null,
    },
  },

  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "Missing field email" }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "Missing field password" }),
  //   subscription: Joi.string(),
});
const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "Missing field email" }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "Missing field password" }),
});
const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
