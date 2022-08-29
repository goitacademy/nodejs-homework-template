const { Schema, model } = require("mongoose");

const Joi = require("joi");

const pwdRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const emailRegexp = /^.+@.+$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      match: pwdRegexp,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
      trim: true,
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

const User = model("user", userSchema);

const joiUserSchema = Joi.object({
  email: Joi.string().trim().pattern(emailRegexp).required(),

  password: Joi.string().pattern(pwdRegexp).trim().required(),
});

module.exports = {
  User,
  joiUserSchema,
};
