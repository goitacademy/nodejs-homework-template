const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
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

userSchema.post("save", handleSchemaValidationErrors);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .required(),
});

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionJoiSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
