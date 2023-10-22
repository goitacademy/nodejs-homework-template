import { Schema, model } from "mongoose";
import Joi from "joi";
import {
  emailPattern,
  handleSaveError,
  runValidatorsAtUpdate,
} from "./hooks.js";

const userSubscription = ["starter", "pro", "business"];

const userSchema = Schema({
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
    enum: userSubscription,
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().min(6).required(),
  // subscription: Joi.any().valid(...userSubscription),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().min(6).required(),
});

export const User = model("user", userSchema);
