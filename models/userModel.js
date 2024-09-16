import { Schema, model } from "mongoose";
import { handleMongooseError, handleUpdateValidate } from "./hooks.js";
import { emailRegexp, subscriptionList } from "../constans/index.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      minLength: 8,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", handleUpdateValidate);

userSchema.post("save", handleMongooseError);

userSchema.post("findOneAndUpdate", handleMongooseError);

const User = model("user", userSchema);

export default User;
