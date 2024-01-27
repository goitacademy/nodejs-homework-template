import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleMongooseError } from "../helpers/index.js";

const contactSchema = new Schema(
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
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

export const addSchema = Joi.object({
	name: Joi.string()
		.required()
		.messages({ "any.required": "missing required name field" }),
	email: Joi.string()
		.required()
		.messages({ "any.required": "missing required email field" }),
	phone: Joi.string()
		.required()
		.messages({ "any.required": "missing required phone field" }),
	favorite: Joi.boolean(),
});

export const putSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().email(),
	phone: Joi.string(),
	favorite: Joi.boolean(),
}).or("name", "email", "phone", "favorite");

export const patchSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

export default Contact;
