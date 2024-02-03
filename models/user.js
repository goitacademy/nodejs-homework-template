const { Schema, model } = require("mongoose");

const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegex,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: {
      type: String,
      required: true,
    },
  },

  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "Missing password field" }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.pattern.base": "Invalid email format",
    "any.required": "Missing email field",
  }),
});
const loginSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "Missing password field" }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.pattern.base": "Invalid email format",
    "any.required": "Missing email field",
  }),
});

const subscribeSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schema = {
  registerSchema,
  loginSchema,
  subscribeSchema,
};

const User = model("user", userSchema);
module.exports = {
  User,
  schema,
};
