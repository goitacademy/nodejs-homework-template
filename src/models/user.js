const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
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
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const user = {
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business").required(),
  token: Joi.string(),
};

const registerUserSchema = Joi.object({
  password: user.password,
  email: user.email,
  subscription: user.subscription,
  token: user.token,
});

const loginUserSchema = Joi.object({
  password: user.password,
  email: user.email,
});

const changeSubscriptionSchema = Joi.object({
  subscription: user.subscription,
});

module.exports = {
  User,
  registerUserSchema,
  loginUserSchema,
  changeSubscriptionSchema,
};
