const { Schema, model } = require("mongoose");
const { handleMangooseError } = require("../helpers");
const Joi = require("joi");

const contactSchema = new Schema({
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
});

const addSchema = Joi.object({
	name: Joi.string().min(3).required(),
	email: Joi.string().required(),
	phone: Joi.string().min(7).required(),
	favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

const schemas = { addSchema, updateFavoriteSchema };

contactSchema.post("save", handleMangooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
