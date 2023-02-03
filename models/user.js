const { Schema, model } = require("mongoose");
const Joi = require("joi");

const usersShema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
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
  { versionKey: false, timesTamps: true }
);

const joiSchema = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  subscription: Joi.string(),
  token: Joi.bool(),
});

const User = model("users", usersShema);

module.exports = { User, joiSchema };
