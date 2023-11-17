const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../middlewares");
const contactSchemaMoongose = new Schema(
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
	{
		timestamps: true,
		versionKey: false,
	},
);

const Contact = model("Contact", contactSchemaMoongose);

contactSchemaMoongose.post("save", handleMongooseError);

const addSchema = Joi.object({
	// name: Joi.string().alphanum().min(3).max(30).required(),
	// email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
	// phone: Joi.string().pattern(/^\+380\d{9}$/),
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});
const updateStatusSchema = Joi.object({ favorite: Joi.boolean().required() });

const schemas = {
	addSchema,
	updateStatusSchema,
};

module.exports = { Contact, schemas };
