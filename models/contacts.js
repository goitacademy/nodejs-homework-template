import { Schema, model } from "mongoose";

import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const constactScheme = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

constactScheme.post("save", handleSaveError);

constactScheme.pre("findOneAndUpdate", preUpdate);

constactScheme.post("findOneAndUpdate", handleSaveError)

export const addContactScheme = Joi.object({
	name: Joi.string().required().messages({"any.required": `missing required field name`}),
	email: Joi.string().required().messages({"any.required": `missing required field email`}),
	phone: Joi.string().required().messages({
		"any.required": `missing required field phone`
	}),
	favorite: Joi.boolean(),
});

export const updateContactScheme = Joi.object({
	name: Joi.string(),
	email: Joi.string(),
	phone: Joi.string(),
	favorite: Joi.boolean(),
});

export const contactFavoriteScheme = Joi.object({
	favorite: Joi.boolean().required()
});

const Contact = model("contact", constactScheme);

export default Contact;
