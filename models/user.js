import { Schema, model } from "mongoose";
import { handleMongooseError } from "./hooks.js";
import { emailRegexp, subscriptionList } from "../constans/user-constans.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: [emailRegexp, "Invalid email format provided"],
      required: [true, "Email is required"],
      index: true,
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
  },
  { timeseries: true, versionKey: false }
);

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);
