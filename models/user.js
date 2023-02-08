const { Schema, model } = require("mongoose");

const Joi = require("joi");

const subscriptions = ["starter", "pro", "business"];

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
      enum: subscriptions,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  subscription: Joi.string().valid(...subscriptions),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptions)
    .required(),
});

const schemas = { registerSchema, loginSchema, updateSubscriptionSchema };

const User = model("user", userSchema);

module.exports = { User, schemas };
