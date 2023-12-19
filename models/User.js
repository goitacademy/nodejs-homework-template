import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, addUpdateSettings } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlenth: 6,
    },
    email: {
      type: String,
      match: emailRegexp,
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

export const userSignupSchema = Joi.object({
  username: { type: String, required: true },
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  // subscription: Joi.string(),
  // token: Joi.string(),
});

export const userSigninSchema = Joi.object({
  username: { type: String, required: true },
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", addUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
