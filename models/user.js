import { Schema, model } from "mongoose";
import { handleSaveError, validateAtUpdate } from "./hooks.js";
import { subscriptionList, emailRegexp } from "../constants/user-constants.js";

const userSchema = new Schema({
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: subscriptionList,
        default: "starter"
    },
    token: String,
    avatarURL: String,
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
}, { versionKey: false, timestamps: true });

userSchema.pre("findOneAndUpdate", validateAtUpdate);
userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;