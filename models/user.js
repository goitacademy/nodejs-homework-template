const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
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
      required: [true, "Avatar is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const joiRegisterSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});

const User = model("user", userSchema);

module.exports = { User, joiRegisterSchema, joiLoginSchema };
