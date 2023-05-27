const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 8,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const userSchemas = {
  register: registerSchema,
  login: loginSchema,
  subscription: subscriptionSchema,
};

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = {
  User,
  userSchemas,
};
