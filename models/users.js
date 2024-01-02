const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

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
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

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

const userEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string(),
});

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);
const schemas = {
  userSignupSchema,
  userSigninSchema,
  userSubscriptionSchema,
  userEmailSchema,
};

module.exports = {
  schemas,
  User,
};
