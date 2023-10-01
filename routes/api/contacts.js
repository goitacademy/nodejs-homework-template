import { Router } from 'express';
import Joi from 'joi';

import {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
} from '../../models/contacts.js';

const router = Router();

// Definicje walidacji dla danych wejściowych (POST i PUT)
const contactPostSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	phone: Joi.string().required(),
});

const contactPutSchema = Joi.object({
	name: Joi.string().optional(),
	email: Joi.string().email().optional(),
	phone: Joi.string().optional(),
}).or('name', 'email', 'phone');

const contactFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

router.get('/', async (req, res, next) => {
	const contacts = await listContacts();
	res.json({ contacts });
});

router.get('/:contactId', async (req, res, next) => {
	const contact = await getContactById(req.params.contactId);

	if (contact == null) {
		res.status(404).json({ message: 'Not found' });
		return;
	}

	res.json(contact);
});

router.post('/', async (req, res, next) => {
	try {
		const values = await contactPostSchema.validateAsync(req.body);
		const newContact = await addContact(values);
		res.status(201).json(newContact);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.delete('/:contactId', async (req, res, next) => {
	const contactId = req.params.contactId;

	const contact = await getContactById(contactId);
	if (contact == null) {
		res.status(404).json({ message: 'Not found' });
		return;
	}

	await removeContact(contactId);
	res.status(200).json({ message: 'contact deleted' });
});

router.put('/:contactId', async (req, res, next) => {
	const contactId = req.params.contactId;

	const contact = await getContactById(contactId);
	if (contact == null) {
		res.status(404).json({ message: 'Not found' });
		return;
	}

	try {
		const values = await contactPutSchema.validateAsync(req.body);
		const contact = await updateContact(contactId, values);
		res.status(200).json(contact);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.patch('/:contactId/favorite', async (req, res, next) => {
	const contactId = req.params.contactId;

	const contact = await getContactById(contactId);
	console.log(contact);
	if (contact == null) {
		res.status(404).json({ message: 'Not found' });
		return;
	}

	try {
		const value = await contactFavoriteSchema.validateAsync(req.body);
		const contact = await updateContact(contactId, value);
		res.status(200).json(contact);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

export default router;
