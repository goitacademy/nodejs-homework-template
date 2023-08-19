import { Schema, model } from "mongoose";
import {handleSaveError, validateAndUpdate} from "./hooks.js";
import {emailRegexp} from "../constants/user-constants.js";
import { subscriptionList } from "../constants/contact-constants.js";

const userSchema = new Schema ({  
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required:  [true, "Email is required"],
    },
    password: {
        type: String,
        minlenth:6,
        required: true,
    },
    subscription: {
        type: String,
        enum: subscriptionList,
        default: "starter",
      },
      token: {
        type: String,
      },
      avatarURL: {
        type: String,
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, "Verify token is required"],
      },

}, {versionKey: false})

userSchema.pre("findOneAndUpdate", validateAndUpdate);

userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;