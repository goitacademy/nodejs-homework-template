const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
	{
		email: {
			type: String,
			match: emailRegexp,
			unique: true,
			required: [true, 'Email is required'],
		},
		password: {
			type: String,
			minlength: 6,
			required: [true, 'Set password for user'],
		},
		subscription: {
			type: String,
			enum: ['starter', 'pro', 'business'],
			default: 'starter',
		},
		token: {
			type: String,
			default: '',
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required().messages({
		'any.required': `missing required email field`,
	}),
	password: Joi.string().min(6).required().messages({
		'any.required': `missing required password field`,
	}),
});

const loginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required().messages({
		'any.required': `missing required email field`,
	}),
	password: Joi.string().min(6).required().messages({
		'any.required': `missing required password field`,
	}),
});

const schemas = {
	registerSchema,
	loginSchema,
};

const User = model('user', userSchema);

module.exports = {
	User,
	schemas,
};
