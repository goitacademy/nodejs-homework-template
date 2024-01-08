const { Schema, model } = require("mongoose");
const { hendleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const userSchema = new Schema(
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
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", hendleMongooseError);

const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": "Missing required email field",
    "string.base": "Email must be text",
    "string.pattern.base": "Entered email is not valid",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Missing required password field",
    "string.base": "Password must be text",
  }),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": "Missing required email field",
    "string.base": "Email must be text",
    "string.pattern.base": "Entered email is not valid",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Missing required password field",
    "string.base": "Password must be text",
  }),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .valid("starter", "pro", "business")
    .messages({
      "any.required": "Missing required field subscription",
      "string.base": "Unknown subscription type",
    }),
});

const schemas = {
  userRegisterSchema,
  userLoginSchema,
  userSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
