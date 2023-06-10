const { Schema, model } = require("mongoose");
const { mongooseValidationError } = require("../helpers");
const Joi = require("joi");

const emailPattern = /[^@s]+@[^@s]+.[^@s]+/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailPattern,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", mongooseValidationError);

const authSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailPattern).required(),
  subscription: Joi.string(),
});

const subscrUpdateSchema = Joi.object({
  subscription: Joi.string()
    .valid(...["starter", "pro", "business"])
    .required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  authSchema,
  subscrUpdateSchema,
};
