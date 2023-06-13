const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../helpers/handleMongooseError.js");

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
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(8),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
const subscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

const emailSchema = Joi.object({ email: Joi.string().required() });

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
