const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const User = mongoose.model("User", userSchema);

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const userCreateValidationShema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const userSubscriptionUpdateValidationShema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const validateCreateUser = validator(userCreateValidationShema);
const validateUpdateSubscription = validator(
  userSubscriptionUpdateValidationShema
);

module.exports = {
  User,
  hashPassword,
  validateCreateUser,
  validateUpdateSubscription,
};