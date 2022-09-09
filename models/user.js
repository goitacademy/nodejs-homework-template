const Joi = require("joi");
const { Schema, model } = require("mongoose");
const user = Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
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
});

const JoiSchema = Joi.object({
  email: Joi.string().email({
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(3).max(30).required(),
});

const User = model("User", user);

module.exports = {
  User,
  JoiSchema,
};
