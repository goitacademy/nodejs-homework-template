import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidators } from "../hooks/hooks.js";

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
  },
  { versionKey: false, timeseries: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidators);
userSchema.post("findOneAndUpdate", handleSaveError);

export const userSingUpSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

export const userSingInSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const User = model("user", userSchema);
export default User;
