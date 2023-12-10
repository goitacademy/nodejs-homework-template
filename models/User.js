import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

const subscriptionType = ["starter", "pro", "business"];

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    password: {
        type: String,
        minLength: 6,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: subscriptionType,
        default: "starter",
        //required: true,
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        //required: true,
}
},{versionKey:false, timestamps: true});

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", preUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription: Joi.string().valid(...subscriptionType),
    //avatarURL: Joi.string().required(),
});

export const userSigninSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    //subscription: Joi.string().valid(...subscriptionType).required(),
    //token: Joi.string(),
});

export const userAvatarsSchema = Joi.object({
   // email: Joi.string().pattern(emailRegexp)/*.required(),
    token: Joi.string(),
});



const User = model("user", userSchema);
export default User;