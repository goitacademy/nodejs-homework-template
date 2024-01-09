import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, addUpdateDocument } from "./hooks.js";


const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
        minlength: 6,
    },
    subscription: {
        type: String,
        enum: subscriptionList,
        default: "starter"
    },
    avatarURL: String,
    token: String
}, { versionKey: false, timestamps: true });

userSchema.post('save', handleSaveError);
userSchema.pre('findOneAndUpdate', addUpdateDocument);

export const userSignupSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

export const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

export const userUpdateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionList),
});

const User = model('user', userSchema);


export default User;