const { Schema, model } = require("mongoose");
const Joi = require("joi");
const subscriptionList = require("../constants/subscription");

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
      enum: subscriptionList,
      default: "starter",
    },
    token: { type: String },
    avatarUrl: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("users", userSchema);

const validateUserSchemaRegister = Joi.object({
  password: Joi.string().min(1).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  subscription: Joi.string(),
});

const validateUserSchemaLogin = Joi.object({
  password: Joi.string().min(1).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const validateUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

const validateUploadAvatar = Joi.object({
  avatarUrl: Joi.string(),
});

module.exports = {
  User,
  validateUserSchemaRegister,
  validateUserSchemaLogin,
  validateUpdateSubscription,
  validateUploadAvatar,
};
