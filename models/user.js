const { Schema, model } = require("mongoose");

const Joi = require("joi");

const userSchema = Schema(
  {
    password: {
      type: String,
      minLength: 6,
      required: [true, "Password is required"],
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
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const userAdd = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

const userLogin = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const joiSchema = { userAdd, userLogin };

module.exports = { User, joiSchema };
