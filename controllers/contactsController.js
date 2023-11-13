import Joi from 'joi';

import * as contactsService from '../models/contacts.js';

import { HttpError } from '../helpers/HttpError.js';

const contactAddSchema = Joi.object({
	name: Joi.string().required().messages({
		'any.required': `"name" is a required field`,
		'string.base': `"name" should be a type of 'text'`,
	}),
	email: Joi.string().required().messages({
		'any.required': `"email" is a required field`,
		'string.base': `"email" should be a type of 'text'`,
	}),
	phone: Joi.string().required().messages({
		'any.required': `"phone" is a required field`,
		'string.base': `"string" should be a type of 'text'`,
	}),
});

const getAllContacts = async (req, res, next) => {
	try {
		const result = await contactsService.listContacts();
		res.json(result);
	} catch (error) {
		next(error);
		// res.status(500).json({
		// 	message: error.message,
		// });
	}
};

const getById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await contactsService.getContactById(contactId);
		if (!result) {
			throw HttpError(404, `Contact with id=${contactId} not found`);
			// const error = new Error(`Contact with id=${contactId} not found`);
			// error.status = 404;
			// throw error;
			// return res.status(404).json({
			// 	message: `Contact with id=${contactId} not found`,
			// });
		}
		res.json(result);
	} catch (error) {
		next(error);
		// const { status = 500, message = 'Server error' } = error;
		// res.status(status).json({
		// 	message,
		// });
	}
};

const add = async (req, res, next) => {
	try {
		const { error } = contactAddSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const result = await contactsService.addContact(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export default {
	getAllContacts,
	getById,
	add,
};
