const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, `Set password for user`],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, `Email is required`],
      match: emailRegExp,
      index: true,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": `"password" and "email" are required field` }),
  email: Joi.string()
    .pattern(emailRegExp)
    .required()
    .messages({ "any.required": `"password" and "email" are required field` }),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": `"password" and "email" are required field` }),
  email: Joi.string()
    .pattern(emailRegExp)
    .required()
    .messages({ "any.required": `"password" and "email" are required field` }),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("User", userSchema);

module.exports = { User, schemas };
