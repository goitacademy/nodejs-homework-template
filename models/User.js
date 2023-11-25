import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

const subscriptionType = ["starter", "pro", "business"];

const userSchema = new Schema({
    password: {
        type: String,
        minLength: 6,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: subscriptionType,
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    }
},{versionKey:false, timestamps: true});

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", preUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
    subscription: Joi.string().valid(...subscriptionType),
    token: Joi.string(),
});

export const userSigninSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
    subscription: Joi.string().valid(...subscriptionType),
    token: Joi.string(),
});

const User = model("user", userSchema);
export default User;