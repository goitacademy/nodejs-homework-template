import Joi from "joi";
import { Schema, model } from "mongoose";
import { addUpdateSettings, handleSaveError } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema({

    password: {
        type: String,
        required: [true, 'Set password for user'],
        minlength: 6,
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
  token: String,
     avatarURL: String,

}, { versionKey: false, timestamps: true });


userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError)
userSchema.pre("findOneAndUpdate", addUpdateSettings)

export const userSignupSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "wrong email format", "any.pattern": "wrong email format" }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "wrong password format" }),
  subscription: Joi.string()
    .default("starter"),
});

export const userSigninSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "wrong email format", "any.pattern": "wrong email format" }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "wrong password" }),
 
});

export const User = model("user", userSchema)