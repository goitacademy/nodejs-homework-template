const { Schema, model } = require("mongoose");
const Joi = require("joi");

const usersSchema = new Schema(
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
const User = model("user", usersSchema);

const schemaSingup = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const schemaLogin = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = {
  User,
  usersSchema,
  schemaSingup,
  schemaLogin,
  schemaUpdateSubscription,
};
