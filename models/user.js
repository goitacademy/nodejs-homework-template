/* eslint-disable semi */
/* eslint-disable quotes */
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      //  match: обязательно, нужно написать регулярное выражение для валидации мыла.
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { versionKey: false, timestamps: true }
);

const userRegisterJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userLoginJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

module.exports = { User, userRegisterJoiSchema, userLoginJoiSchema };
