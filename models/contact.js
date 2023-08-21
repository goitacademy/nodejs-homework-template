const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const validationPatterns = {
	email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
	phone: /^\(\d{3}\)\s\d{3}-\d{4}$/,
};

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
			match: validationPatterns.email,
		},
		phone: {
			type: String,
			match: validationPatterns.phone,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
	name: Joi.string()
		.required()
		.messages({ "any.required": "missing required name field" }),
	email: Joi.string()
		.pattern(validationPatterns.email)
		.required()
		.messages({ "any.required": "missing required email field" }),
	phone: Joi.string()
		.pattern(validationPatterns.phone)
		.required()
		.messages({ "any.required": "missing required phone field" }),
	favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean()
		.required()
		.messages({ "any.required": "missing field favorite" }),
});

const schemas = {
	addSchema,
	updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
	Contact,
	schemas,
};
