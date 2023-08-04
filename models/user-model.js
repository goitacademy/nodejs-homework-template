import { Schema, model } from "mongoose";
import { handleSaveError, handleUpdateValidate } from "./hooks.js";

import { emailRegexp } from "../constants/user-constants.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
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

userSchema.pre("findOneAndUpdate", handleUpdateValidate);
userSchema.post("findOneAndUpdate", handleSaveError);
// при методі PUT 2спосіб валідація при оновленні зміні, 1сп в контролерах
userSchema.post("save", handleSaveError);
// / при методі POST щоб відловлювати помилку валідації

const User = model("user", userSchema);

export default User;

// "name":"Roman",
// "email":"roman@gmail.com",
//  "password":"123456"
