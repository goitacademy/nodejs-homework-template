const express = require('express');

const { HttpError } = require('../helpers');
const contactsService = require('../../models/index');
const Joi = require('joi');

const contactSchema = Joi.object({
	name: Joi.string()
		.regex(/^[a-zA-Z0-9 ]*$/)
		.required()
		.messages({
			'any.required': 'Missing required name field',
			'string.regex': 'Invalid characters in name field'
		}),
	email: Joi.string()
		.email()
		.required()
		.messages({ 'any.required': 'Missing required email field' }),
	phone: Joi.string()
		.min(7)
		.max(14)
		.pattern(/^[0-9()-]+$/)
		.required()
		.messages({ 'any.required': 'Missing required phone field' })
});

const router = express.Router();

router.get('/', async (req, res, next) => {
	const result = await contactsService.getListContacts();
	res.json(result);
});

router.get('/:contactId', async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contactsService.getContactById(id);
		if (!result) throw HttpError(404, `Contact with id=${id} not found`);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { error } = contactSchema.validate(req.body);
		if (error) throw HttpError(400, error.message);
		const result = await contactsService.addContact(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

router.delete('/:contactId', async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contactsService.removeContact(id);
		if (!result) throw HttpError(404, `Contact with id=${id} not found`);
		res.status(200).json(result, 'contact deleted');
	} catch (error) {
		next(error);
	}
});

router.put('/:contactId', async (req, res, next) => {
	try {
		const { error } = contactSchema.validate(req.body);
		if (error) throw HttpError(400, error.message);
		const { id } = req.params;
		const result = await contactsService.updateContact(id, req.body);
		if (!result) throw HttpError(404, `Contact with id=${id} not found`);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
