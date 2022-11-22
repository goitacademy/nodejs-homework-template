const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const subscriptionList = ["starter", "pro", "business"];
const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;

const userSocialSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
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

userSocialSchema.post("save", handleSchemaValidationErrors);

const signupSchema = Joi.object({
  displayName: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid(...subscriptionList),
});

const loginSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});
const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const userSocialJoiSchemas = {
  signupSchema,
  loginSchema,
  subscriptionSchema,
  verifyEmailSchema,
};
const UserSocial = model("socialuser", userSocialSchema);

module.exports = {
  UserSocial,
  userSocialJoiSchemas,
};
