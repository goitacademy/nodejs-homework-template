const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const nameRegexp = /^[A-Za-z ]+$/;
const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const validationSchema = Joi.object({
	name: Joi.string()
		.min(2)
		.max(30)
		.pattern(nameRegexp)
		.messages({
			"string.pattern.base": "Invalid name. The name must contain only letters.",
			"any.required": `"name" is a required field`,
		})
		.required(),
	email: Joi.string()
		.email({ minDomainSegments: 2 })
		.messages({
			"string.pattern.base": "Invalid email. The email must be valid.",
			"any.required": `"email" is a required field`,
		})
		.required(),
	phone: Joi.string()
		.pattern(phoneRegexp)
		.messages({
			"string.pattern.base": "Invalid phone number format. The format should be (XXX) XXX-XX-XX.",
			"any.required": `"phone" is a required field`,
		})
		.required(),
	favorite: Joi.boolean(),
});

module.exports = validationSchema;

const contactSchema = new Schema(
	{
		name: {
			type: String,
			match: nameRegexp,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			match: phoneRegexp,
			required: true,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true },
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, validationSchema };
