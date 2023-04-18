const { Schema, model } = require("mongoose");

const { mongooseError } = require("../helpers");

const Joi = require("joi");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 1,
      required: [true, "Set name for contact"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
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
  { versionKey: false }
);
userSchema.post("save", mongooseError);

const User = model("user", userSchema);

const register = Joi.object({
  name: Joi.string().min(1).max(50).trim(),
  password: Joi.string().min(6).trim().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const lodIn = Joi.object({
  password: Joi.string().min(6).trim().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const subscriptionUpdate = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
}).min(1);
const schemas = {
  subscriptionUpdate,
  lodIn,
  register,
};

module.exports = {
  User,
  schemas,
};
