const Joi = require("joi");
const { Schema, model } = require("mongoose");

const emailRerexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRerexp,
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

const addUserSchema = Joi.object({
  email: Joi.string().pattern(emailRerexp).required(),
  password: Joi.string().min(6).required(),
});

const subUpdate = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
  add: addUserSchema,
  sub: subUpdate,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
