const { Schema, model } = require("mongoose");
const Joi = require("joi");
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

const joiSignupSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string(),
  subscription: Joi.string(),
  token: Joi.string(),
});
const joiLoginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string(),
});
const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSignupSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
};
