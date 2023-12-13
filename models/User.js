import { Schema, model } from "mongoose";
import Joi from "joi";

import { saveError, preUpdate } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
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
    token: String,
    avatarURL: String,
  },
  { versionKey: false, timeseries: true }
);

userSchema.post("save", saveError);
userSchema.pre("findOneAndUpdate", preUpdate);
userSchema.post("findOneAndUpdate", saveError);

export const userSignupShema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required password field" }),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export const userSigninShema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

export default User;
