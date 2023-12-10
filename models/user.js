const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const authSubscription = ["starter", "pro", "business"];

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
      enum: authSubscription,
      default: "starter",
    },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },

  { versionKey: false }
);

userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string()
    .valid(...authSubscription)
    .default("starter"),
});
const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});
const emailSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "missing required field email",
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

module.exports = {
  User,
  schemas,
};
