const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailPattern,
      required: [true, "Email is required"],
      unique: true,
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
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required().pattern(emailPattern),
  subscription: Joi.string()
    .valid(...subscriptionList)
    .default("starter"),
}).messages({ "string.pattern.base": "{#label} in not valid" });

const loginSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required().pattern(emailPattern),
}).messages({ "string.pattern.base": "{#label} in not valid" });

const updateSubSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .valid(...subscriptionList),
}).messages({
  "string.pattern.base": "{#label} in not valid",
  "any.required": `{#label} is a required field`,
});

const User = model("user", userSchema);

module.exports = {
  User,
  registerSchema,
  loginSchema,
  updateSubSchema,
};
