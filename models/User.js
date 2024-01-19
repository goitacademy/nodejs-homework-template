import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, addUpdateSettings } from "./hooks.js"; 

const subscriptionList = ["starter", "pro", "business"];

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
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
    }
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", addUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);


export const userSignupSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().valid(...subscriptionList),
});

export const userSigninSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

export default User;