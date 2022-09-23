const express = require('express');
const { nanoid } = require('nanoid');
const { RequestError } = require('../../helpers');
const Joi = require('joi');

const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require('../../models/contacts');

const schema = Joi.object({
	name: Joi.string().min(5).max(20),
	email: Joi.string().email().min(8).max(25),
	phone: Joi.string().min(9).max(15),
});

const router = express.Router();

router.get('/', async (req, res, next) => res.json(await listContacts()));

router.get('/:contactId', async (req, res, next) => {
	try {
		const id = req.params.contactId;
		const findedContact = await getContactById(id);

		if (!findedContact) {
			throw RequestError(404);
		}

		return res.json(findedContact);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const newContactData = req.body;
		const { name, email, phone } = newContactData;
		const { error } = schema.validate(newContactData);

		switch (true) {
			case Boolean(!name):
				throw RequestError(400, 'missing required name field');

			case Boolean(!email):
				throw RequestError(400, 'missing required email field');

			case Boolean(!phone):
				throw RequestError(400, 'missing required phone field');

			case Boolean(error):
				throw RequestError(400, error.message);

			default:
				break;
		}

		const contact = { id: nanoid(), name, email, phone };

		await addContact(contact);

		return res.json({ contact }).status(201);
	} catch (error) {
		next(error);
	}
});

router.delete('/:contactId', async (req, res, next) => {
	try {
		const id = req.params.contactId;

		const isDeleted = await removeContact(id);

		if (!isDeleted) {
			throw RequestError(404);
		}

		return res.json({ message: 'Contact deleted' });
	} catch (error) {
		next(error);
	}
});

router.put('/:contactId', async (req, res, next) => {
	try {
		const id = req.params.contactId;
		const newContactData = req.body;
		const { name, email, phone } = newContactData;
		const { error } = schema.validate(newContactData);

		if (error) {
			throw RequestError(400, error.message);
		}

		if (!name && !email && !phone) {
			throw RequestError(400, 'missing fields');
		}

		const contact = await updateContact(id, newContactData);

		if (!contact) {
			throw RequestError(404);
		}

		return res.json({ contact });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
