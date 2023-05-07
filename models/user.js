const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
const passwordRegexp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
const validEnumValues = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      match: passwordRegexp,
      minlength: 8,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      mutch: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: validEnumValues,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      require: true,
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

const registerSchema = Joi.object({
  password: Joi.string().min(8).pattern(passwordRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(8).pattern(passwordRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...validEnumValues)
    .required(),
}).unknown(false);

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  emailSchema,
};

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = { User, schemas };
