import { Schema, model } from "mongoose";

import { handleSaveError, validateAtUpdate } from "./hooks.js";
import { emailRegExp } from "../constants/user-constants.js";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlenth: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: { type: String },
    token: { type: String },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", validateAtUpdate);
userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

export const User = model("user", userSchema);
export default User;
