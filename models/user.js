const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const regexpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: regexpEmail,
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
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(regexpEmail).required(),
  password: Joi.string().min(6).required(),
});

const login = Joi.object({
  email: Joi.string().pattern(regexpEmail).required(),
  password: Joi.string().min(6).required(),
});

const subscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
  register,
  login,
  subscription,
};

const User = model("user", userSchema);

module.exports = { User, schemas };