const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;
const subscriptions = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },
    subscription: {
      type: String,
      enum: subscriptions,
      default: "starter"
    },

    avatarURL: String,

    token: {
      type: String,
      default: null
    }
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaValidationErrors);
userSchema.post("findOneAndUpdate", handleSchemaValidationErrors);

const User = model("user", userSchema);

const registerSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
  repeatPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
});

const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required(),
  password: Joi.string()
    .min(6)
    .required()
});

const updateUserSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptions)
    .required()
    .messages({ "any.required": `missing field subscription` })
});

module.exports = {
  User,
  registerSchema,
  loginSchema,
  updateUserSubscriptionSchema
};
