const { Schema, model } = require("mongoose");
const Joi = require("joi");

const usersSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minlength: 6,
      // unique: true,
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

const User = model("user", usersSchema);

const authUserJoiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const loginUserJoiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const changeSubscriptionUserJoiSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  User,
  authUserJoiSchema,
  loginUserJoiSchema,
  changeSubscriptionUserJoiSchema,
};
