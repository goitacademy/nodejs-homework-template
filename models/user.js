const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Joi = require("joi");

const regexExpression = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/;

const User = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: regexExpression,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

const JoiUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(regexExpression).required(),
  token: Joi.string(),
});

const UserModel = mongoose.model("user", User);

module.exports = {
  UserModel,
  JoiUserSchema,
};
