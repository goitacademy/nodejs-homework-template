import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";
import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const userShema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minLength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [emailRegexp, "Please fill a valid email address"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userShema.post("save", handleSaveError);

userShema.pre("findOneAndUpdate", preUpdate);

userShema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required name field`,
  }),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export const userSigninSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required name field`,
  }),
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

const User = model("user", userShema);

export default User;
