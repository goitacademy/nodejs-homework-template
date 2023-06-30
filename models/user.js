const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      // default: "",
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required "email" field`,
    "string.empty": `"email" cannot be an empty field`,
    "string.pattern.base": `"email" must be a valid email address`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required "password" field`,
    "string.min": `"password" should have a minimum length of {#limit}`,
    "string.empty": `"password" cannot be an empty field`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required "email" field`,
    "string.empty": `"email" cannot be an empty field`,
    "string.pattern.base": `"email" must be a valid email address`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required "password" field`,
    "string.min": `"password" should have a minimum length of {#limit}`,
    "string.empty": `"password" cannot be an empty field`,
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required "email" field`,
    "string.empty": `"email" cannot be an empty field`,
    "string.pattern.base": `"email" must be a valid email address`,
  }),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .messages({
      "any.only": "Ivalid subscription",
    }),
});

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = {
  schemas,
  User,
};
