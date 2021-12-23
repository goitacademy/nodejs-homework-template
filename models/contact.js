const { Schema, model } = require("mongoose");
const Joi = require("joi");

const patternPhone = "\\(?(\\d{3})\\)?[- ]?(\\d{3})[- ]?(\\d{2})[- ]?(\\d{2})";

const contactsSchema = Schema(
	{
		name: {
			type: String,

			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
			required: [true, "Set email for contact"],
			unique: true,
		},
		phone: {
			type: String,
			required: [true, "Set phone for contact"],
			unique: true,
		},
		favorite: { type: Boolean, default: false },
	},
	{ versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
	name: Joi.string().min(2).required,
	email: Joi.string().email().required(),
	phone: Joi.string().pattern(new RegExp(patternPhone)).required(),
	favorite: Joi.boolean().optional(),
});

const Contact = model("contact", contactsSchema);

module.exports = { Contact, joiSchema };
