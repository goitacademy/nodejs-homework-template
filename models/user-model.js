import { Schema, model } from "mongoose";
// import Joi from "joi";

import { handlSaveError, runValidateAtUpdate } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: emailRegexp,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
}, { versionKey: false, timestamps: true });

userSchema.post("save", handlSaveError)

userSchema.pre("findOneAndUpdate", runValidateAtUpdate);

userSchema.post("findOneAndUpdate", handlSaveError);

const User = model("user", userSchema);

export default {
  User,
};