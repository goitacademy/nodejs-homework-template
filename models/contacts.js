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
	name: Joi.string().required().message("missing required name field"),
	email: Joi.string().required().message("missing required email field"),
	phone: Joi.string().required().message("missing required phone field"),
	favorite: Joi.boolean(),
});

export const updateContactScheme = Joi.object({
	name: Joi.string(),
	email: Joi.string(),
	phone: Joi.string(),
	favorite: Joi.boolean(),
});

export const contactFavoriteScheme = Joi.object({
	favorite: Joi.boolean().message("missing field favorite")
});

const Contact = model("contact", constactScheme);

export default Contact;
