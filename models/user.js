const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveError } = require("../helpers");

const userSchema = new Schema(
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
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSaveError);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.any().valid("starter", "pro", "business"),
});

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
};
const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
