const { Schema, model } = require("mongoose");
const Joi = require("joi");
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
    owner: {
      type: String,
      ref: "user",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
  name: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});
const updateBySubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
const schemas = {
  registerSchema,
  loginSchema,
  updateBySubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  schemas,
  User,
};
