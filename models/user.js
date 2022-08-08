const { Schema, model } = require("mongoose");
const Joi = require("joi");
const gravatar = require('gravatar');
const { v4 } = require('uuid');


const schema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
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
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {}, true);
      }
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: function () {
        return v4();
      },
    },
  },
  { timestamps: true }
);

const schemaRegister = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string().required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});


const User = model("user", schema);

module.exports = {
  User,
  schemaRegister,
  schemaLogin,
};
