const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const users = new Schema(
  {
    password: {
      type: String,
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
  {
    versionKey: false,
  }
);
const joiSchema = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  subscription: Joi.string(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  token: Joi.string(),
});
const joiSchemaSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
const User = mongoose.model("user", users);

module.exports = { User, joiSchema, joiSchemaSubscription };
