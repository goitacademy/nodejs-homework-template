import { Schema, model } from "mongoose";
import { emailRegexp, subscriptionList } from "../constants/index.js";
import { handleSaveError, validateAtUpdate } from "./hooks.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlenth: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      email: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: String,
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", validateAtUpdate);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
