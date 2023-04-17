const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils/index");

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegex,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  {
    versionKey: false,
  }
);

userSchema.post("save", handleMongooseError);

const schemas = {
  // Create a new user schema
  registerSchema: Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
  }),
  // Log in with a user
  loginSchema: Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
  }),
};

const User = model("user", userSchema);

module.exports = { User, schemas };
