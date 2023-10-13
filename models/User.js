import { Schema, model } from "mongoose";
import { handleServerError, runValidatorsAtUpdate } from "./hooks.js";
import Joi from "joi";
import { join } from "path";

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
      match: emailRegexp,
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
userSchema.post("save", handleServerError);
userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
userSchema.post("findOneAndUpdate", handleServerError);

export const userSignUpSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().required(),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const User = model("user", userSchema);

export default User;
