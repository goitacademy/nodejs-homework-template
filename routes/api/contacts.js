const express = require('express');
const router = express.Router();
const Joi = require('joi');

const contactsOperations = require('../../models');

const joiScheme = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
	try {
		const contacts = await contactsOperations.listContacts();
		res.json(contacts);
	} catch (error) {
		next(error);
	}
});

router.get('/:contactId', async (req, res, next) => {
	const { contactId } = req.params;
	try {
		const contact = await contactsOperations.getContactById(contactId);
		if (!contact) {
			const error = new Error('Not found');
			error.status = 404;
			throw error;
		}
		res.json(contact);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { error } = joiScheme.validate(req.body);
		if (error) {
			error.status = 400;
			throw error;
		}
		const newContact = await contactsOperations.addContact(req.body);
		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
});

router.delete('/:contactId', async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const deleteContact = await contactsOperations.removeContact(contactId);
		if (!deleteContact) {
			const error = new Error('Not found');
			error.status = 404;
			throw error;
		}
		res.json({ message: 'contact deleted' });
	} catch (error) {
		next(error);
	}
});

router.patch('/:contactId', async (req, res, next) => {
	try {
		const { error } = joiScheme.validate(req.body);
		if (error) {
			error.status = 400;
			throw error;
		}
		const { contactId } = req.params;
		const updateContact = await contactsOperations.updateContact({
			contactId,
			...req.body,
		});
		if (!updateContact) {
			error.status = 400;
			throw error;
		}
		res.json(updateContact);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
