const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

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
    token: String,
  },
  { versionKey: false, timestamp: true }
);
userSchema.post("save", handleMongooseError);

const registerValidator = (data) => {
  const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });
  return registerSchema.validate(data);
};

const loginValidator = (data) => {
  const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });
  return loginSchema.validate(data);
};

const User = model("user", userSchema);

module.exports = {
  User,
  registerValidator,
  loginValidator,
};
