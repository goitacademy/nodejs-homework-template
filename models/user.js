const mongoose = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new mongoose.Schema(
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
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const RegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const LoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = { RegisterSchema, LoginSchema };

const User = mongoose.model("User", userSchema);
module.exports = {
  schemas,
  User,
};
