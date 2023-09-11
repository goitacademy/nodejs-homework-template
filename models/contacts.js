const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
const { REGEXP } = require("../constants");

const contactSchema = new Schema(
	{
		name: {
			type: String,
			minLength: 2,
			maxLength: 255,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
			minlength: 4,
			maxlength: 255,
			match: REGEXP.email,
			required: true,
		},
		phone: {
			type: String,
			match: REGEXP.phone,
			required: true,
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

const Contact = model("contact", contactSchema);

const updateContactStatusByIdSchema = Joi.object({
	favorite: Joi.boolean().required(),
});
const addContactSchema = Joi.object({
	name: Joi.string().min(4).max(255).required(),
	email: Joi.string().min(4).max(255).pattern(REGEXP.email).required(),
	phone: Joi.string()
		.pattern(
			REGEXP.phone,
			"pattern: /\\d{3}-\\d{3}-\\d{4}/ example: 123-456-7890"
		)
		.required(),
});

const schemas = {
	addContactSchema,
	updateContactStatusByIdSchema,
};

module.exports = {
	Contact,
	schemas,
};