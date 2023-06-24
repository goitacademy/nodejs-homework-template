const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const subscriptionType = ["starter", "pro", "business"];

const userSchema = new Schema({
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

  avatarURL: String,

  token: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    default: "",
  },
});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const updateSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionType)
    .required(),
});

const schemas = { registerSchema, loginSchema, updateSchema };

const User = model("user", userSchema);

module.exports = { User, schemas };
