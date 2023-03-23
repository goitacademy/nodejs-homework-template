const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
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
  { versionKey: false, timestampe: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const RegisterJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  subscription: Joi.string().valid(
    ...Object.values(["starter", "pro", "business"])
  ),
});

const LoginJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const SubscriptionJoiSchema = Joi.object({
  subscription: Joi.string()
    .valid(...Object.values(["starter", "pro", "business"]))
    .required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  RegisterJoiSchema,
  LoginJoiSchema,
  SubscriptionJoiSchema,
};
