const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { hendleSave } = require("../helpers");
const subscriptionType = ["starter", "pro", "business"];

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
      enum: subscriptionType,
      default: "starter",
    },
    token: { type: String },
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);
const registerSchems = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email(),
  subscription: Joi.string().valid(...subscriptionType),
});
const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email(),
});
const EmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
userSchema.post("save", hendleSave);
const User = model("user", userSchema);

const schemas = {
  registerSchems,
  loginSchema,
  EmailSchema,
};
module.exports = {
  User,
  schemas,
};
