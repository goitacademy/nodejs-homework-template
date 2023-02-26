const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
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
			required: [true, "Set phone number for contact"],
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email(),
	phone: Joi.string().length(10).regex(/^\d+$/).required(),
	favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
	favorite: Joi.boolean().required(),
});
const schemas = {
	addSchema,
	updateSchema,
};

module.exports = {
	schemas,
	Contact,
};
