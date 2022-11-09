const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: emailFormat,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true })

userSchema.post("save", handleSaveErrors)

const User = model("user", userSchema);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailFormat).required(),
  subscription: Joi.string(),
  // token: Joi.string().required(),
})

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailFormat).required(),
})

const schemas = {
  registerSchema,
  loginSchema,
}

module.exports = {
  User,
  schemas,
}