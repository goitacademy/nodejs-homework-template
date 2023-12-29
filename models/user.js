import { Schema, model } from "mongoose";

import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const subscriptionType = ["starter", "pro", "business"]
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, "Set password for user"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: subscriptionType,
			default: "starter",
		},
		token: String,
	},
	{ versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", preUpdate);

userSchema.post("findOneAndUpdate", handleSaveError)

export const userSignupScheme = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().validate(...subscriptionType)
})

export const userSigninScheme = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailPattern).required()
})

export const userUpdateSubscriptionScheme = Joi.object({
	subscription: Joi.string().required()
})

const User = model('user', userSchema)

export default User