const { Schema } = require("mongoose");
const Joi = require("joi");

const mongooseContactSchema = new Schema(
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

const joiContactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net"] },
	}),
	favorite: Joi.boolean(),
	phone: Joi.string()
		.min(0)
		.max(15)
		.pattern(/^[0-9]+$/)
		.required(),
});

const joiToggleFavouriteContactSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

module.exports = {
	mongooseContactSchema,
	joiContactSchema,
	joiToggleFavouriteContactSchema,
};
