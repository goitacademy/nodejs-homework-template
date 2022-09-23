const express = require('express');
const { nanoid } = require('nanoid');

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
	email: Joi.string().email().min(8).max(20),
	phone: Joi.string().min(9).max(15),
});

const router = express.Router();

router.get('/', async (req, res, next) => {
	const contacts = await listContacts();

	return res.json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
	const id = req.params.contactId;

	const findedContact = await getContactById(id);

	return findedContact
		? res.json(findedContact)
		: res.json({ message: 'Not found' }).status(404);
});

router.post('/', async (req, res, next) => {
	const newContactData = req.body;
	const { name, email, phone } = newContactData;
	const { error } = schema.validate(newContactData);

	if (error) {
		return res
			.json({ error_name: error.name, message: error.message })
			.status(400);
	}

	switch (false) {
		case Boolean(name):
			return res
				.status(400)
				.json({ message: 'missing required name field' });

		case Boolean(email):
			return res
				.status(400)
				.json({ message: 'missing required email field' });

		case Boolean(phone):
			return res
				.status(400)
				.json({ message: 'missing required phone field' });

		default:
			break;
	}

	const contact = { id: nanoid(), name, email, phone };

	await addContact(contact);

	res.json({ contact }).status(201);
});

router.delete('/:contactId', async (req, res, next) => {
	const id = req.params.contactId;

	const isDeleted = await removeContact(id);

	return isDeleted
		? res.json({ message: 'Contact deleted' })
		: res.status(404).json({ message: 'Not found!' });
});

router.put('/:contactId', async (req, res, next) => {
	const id = req.params.contactId;
	const newContactData = req.body;
	const { name, email, phone } = newContactData;
	const { error } = schema.validate(newContactData);

	if (error) {
		return res
			.json({ error_name: error.name, message: error.message })
			.status(400);
	}

	if (!name && !email && !phone) {
		return res.status(400).json({ message: 'missing fields' });
	}

	const contact = await updateContact(id, newContactData);

	return contact
		? res.json({ contact })
		: res.status(404).json({ message: ' Not found' });
});

module.exports = router;