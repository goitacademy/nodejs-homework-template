const express = require('express');
const Joi = require('joi');
const contactsOperations = require('../../services/contacts');
const { createError } = require('../../utils');

const router = express.Router()

const newContactSchema = Joi.object({
	name: Joi.string.required(),
	email: Joi.string().email().required(),
	phone: Joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/).required(),
})

router.get('/', async (req, res, next) => {
	try {
		const contacts = await contactsOperations.listContacts();
		res.json(contacts);
	} catch (error) {
		next(error);
	};
});

router.get('/:contactId', async (req, res, next) => {
    try {
		const { contactId } = req.params;
		const contact = await contactsOperations.getContactById(contactId);
		if (!contact) {
		throw createError(404);
		};
		res.json(contact);
	} catch (error) {
		next(error);
	};
});

router.post('/', async (req, res, next) => {
	try {
		const { error } = newContactSchema.validate(req.body);
		if (error) {
			throw createError(400, error.message);
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
		const removedContact = await contactsOperations.removeContact(contactId);
		if (!removedContact) {
			throw createError(404);
		};
		res.json({ message: "contact deleted" });
		
	} catch (error) {
		next(error);
	}
});

router.put('/:contactId', async (req, res, next) => {
	try {
		const { error } = newContactSchema.validate(req.body);
		if (error) {
			throw createError(400, error.message);
		};
		const { contactId } = req.params;
		const updatedContact = await contactsOperations.updateContact(contactId, req.body);
		if (!updatedContact) {
			throw createError(404);
		};
		res.json(updatedContact);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
