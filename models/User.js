import Joi from "joi";
import { Schema, model } from "mongoose";
import { addUpdateSettings, handleSaveError } from "./hoooks.js";

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
    token: String

}, { versionKey: false, timestamps: true });


userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError)
userSchema.pre("findOneAndUpdate", addUpdateSettings)

export const userSignupSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "email", "any.pattern": "wrong email format" }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "password" }),
  subscription: Joi.string()
    .default("starter"),
});

export const userSigninSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "email", "any.pattern": "wrong email format" }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "password" }),
 
});

export const User = model("user", userSchema)