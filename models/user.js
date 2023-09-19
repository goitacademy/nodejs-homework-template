const { Schema, model } = require("mongoose");
const Joi = require("@hapi/joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

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
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().empty().messages({
    "string.empty": `EMAIL cannot be an empty field`,
    "any.required": `missing required EMAIL field`,
  }),
  password: Joi.string().min(6).required().empty().messages({
    "string.empty": `PASSWORD cannot be an empty field`,
    "string.min": `PASSWORD should have a minimum length of {#limit}`,
    "any.required": `missing required PASSWORD field`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().empty().messages({
    "string.empty": `EMAIL cannot be an empty field`,
    "any.required": `missing required EMAIL field`,
  }),
  password: Joi.string().required().empty().min(6).messages({
    "string.empty": `PASSWORD cannot be an empty field`,
    "string.min": `PASSWORD should have a minimum length of {#limit}`,
    "any.required": `missing required PASSWORD field`,
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
