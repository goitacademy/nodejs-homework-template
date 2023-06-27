const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const phoneRegexp = /^\(\d{3}\)\d{2}-\d{2}-\d{3}$/;

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
			match: emailRegexp,
			required: [true, "Set email for contact"],
		},
		phone: {
			type: String,
			match: phoneRegexp,
			required: [true, "Set phone for contact"],
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	phone: Joi.string().pattern(phoneRegexp).required(),
	favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().pattern(emailRegexp).required(),
	phone: Joi.string().pattern(phoneRegexp).required(),
	favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

const schemas = { addSchema, updateFavoriteSchema, updateSchema };

module.exports = { Contact, schemas };
