const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /^\d{3}-\d{3}-\d{4}$/;

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for contact'],
		},
		email: {
			type: String,
			match: emailRegexp,
			require: true,
		},
		phone: {
			type: String,
			match: phoneRegexp,
			require: true,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	phone: Joi.string().pattern(phoneRegexp).required(),
	favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

const schemas = {
	addSchema,
	updateFavoriteSchema,
};

const Contact = model('contact', contactSchema);

module.exports = {
	Contact,
	schemas,
};
