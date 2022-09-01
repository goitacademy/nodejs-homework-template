const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { handleSchemaValidationErrors } = require("../utils");

const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      // required: [true, "Password is required"],
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      required: true,
      // required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaValidationErrors);

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const signupSchema = Joi.object({
  password: Joi.string().required(),
  // repeat_password: Joi.ref("password"),
  email: Joi.string().pattern(emailRegex).required(),
  subscription: Joi.string().required(),
  // token: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  // token: Joi.string().required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
  userId: Joi.string().required(),
});

const schemas = {
  signupSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
