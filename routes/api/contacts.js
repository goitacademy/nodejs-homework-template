const express = require('express');
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const result = await listContacts();
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.get('/:contactId', async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await getContactById(contactId);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const body = req.body;
		const result = await addContact(body);
		res.status(201).json(result);
	} catch (err) {
		next(err);
	}
});

router.delete('/:contactId', async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await removeContact(contactId);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.put('/:contactId', async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const body = req.body;
		const result = await updateContact(contactId, body);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
