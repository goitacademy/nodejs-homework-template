const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveError, runValidatorsAtUpdate } = require("../models/hooks");

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
    },
    avatarUrl: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

const userSignupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userSigninSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = { User, userSignupSchema, userSigninSchema };
