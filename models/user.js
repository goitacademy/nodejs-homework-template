const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
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
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
});

const joiAuthSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiUserSchema,
  joiAuthSchema,
  joiSubscriptionSchema,
};
