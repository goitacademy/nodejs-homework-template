const express = require('express');
const router = express.Router();
const Contacts = require('../../models/contacts');
const validate = require('../../services/validation');

router.get('/', async (req, res, next) => {
	try {
		const contacts = await Contacts.listContacts();
		return res.json({
			status: 'success',
			code: 200,
			data: {
				contacts,
			},
		});
	} catch (e) {
		next(e);
	}
});

router.get('/:contactId', async (req, res, next) => {
	try {
		const contact = await Contacts.getContactById(req.params.contactId);
		if (contact) {
			return res.json({
				status: 'success',
				code: 200,
				data: {
					contact,
				},
			});
		} else {
			return res.status(404).json({
				status: 'error',
				code: 404,
				data: 'Not Found',
			});
		}
	} catch (e) {
		next(e);
	}
});

router.post('/', validate.createContact, async (req, res, next) => {
	try {
		const contact = await Contacts.addContact(req.body);
		if (contact) {
			return res.json({
				status: 'success',
				code: 200,
				data: {
					contact,
				},
			});
		} else {
			return res.status(404).json({
				status: 'error',
				code: 404,
				data: 'Not Found',
			});
		}
	} catch (e) {
		next(e);
	}
});

router.delete('/:contactId', async (req, res, next) => {
	try {
		const contact = await Contacts.removeContact(req.params.contactId);
		if (contact) {
			return res.json({
				status: 'success',
				code: 200,
				data: {
					contact,
				},
			});
		} else {
			return res.status(404).json({
				status: 'error',
				code: 404,
				data: 'Not Found',
			});
		}
	} catch (e) {
		next(e);
	}
});

router.patch('/:contactId', validate.updateContact, async (req, res, next) => {
	try {
		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({
				status: 'missing fields',
				code: 400,
			});
		}

		const contact = await Contacts.updateContact(
			req.params.contactId,
			req.body
		);

		if (contact) {
			return res.json({
				status: 'success',
				code: 200,
				data: {
					contact,
				},
			});
		} else {
			return res.status(404).json({
				status: 'error',
				code: 404,
				data: 'Not Found',
			});
		}
	} catch (e) {
		next(e);
	}
});

module.exports = router;
