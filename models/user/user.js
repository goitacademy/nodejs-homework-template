const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handlerMongooseError } = require("../../helpers");

const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handlerMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const ubdateSubscriptaion = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

const Schemas = {
  registerSchema,
  loginSchema,
  ubdateSubscriptaion,
};

const User = model("user", userSchema);

module.exports = {
  User,
  Schemas,
};
