const mongoose = require("mongoose");
const Joi = require("joi");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
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
  accessToken: {
    type: String,
    default: "",
  },
  refreshToken: {
    type: String,
    default: "",
  },
  avatarURL: {
    type: String,
    required: [true, "Is required"],
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

userSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const User = model("User", userSchema);

const registerSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-z,A-Z,0-9, ,-]+$/)
    .min(2)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(7).max(20).required(),
  subscription: Joi.string().default("starter"),
  avatarURL: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(7).max(20).required(),
});

const updateSubSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  User,
  registerSchema,
  loginSchema,
  updateSubSchema,
  verifyEmailSchema,
  refreshTokenSchema,
};
