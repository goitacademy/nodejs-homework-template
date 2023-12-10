const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

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
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
});

const userSignupSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

const userSigninSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string(),
});

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);
const schemas = { userSignupSchema, userSigninSchema, userSubscriptionSchema };

module.exports = {
  schemas,
  User,
};
