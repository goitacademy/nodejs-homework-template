const express = require('express')
const contacts = require('../../models/contacts')
const Joi = require('joi');

const schema = Joi.object({
	name: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.required(),
	
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
	phone: Joi.number()
})
	.with('name', 'email');

const router = express.Router()

router.get('/', async (req, res, next) => {
	const result = await contacts.listContacts()
	res.json(result)
})

router.get('/:contactId', async (req, res, next) => {
	const { contactId } = req.params;
	const result = await contacts.getContactById(contactId)
	if (result === null)
	{
		res.status(404).json({ message: 'Not found' })
		return;
		}
	res.json(result)
})

router.post('/', async (req, res, next) => {


	const { name, email, phone } = req.body;
	const { error, value } = schema.validate({ name: name, email: email, phone: phone });
	
	if (error) {
		res.status(400).json({ message: error.details })
		return;
	}

	if (!name || !email || !phone) {
		res.status(400).json({ message: "missing required name field" })
		return;
	}

	const result = await contacts.addContact(name, email, phone)
	res.status(201).json(result)
})

router.delete('/:contactId', async (req, res, next) => {
	const { contactId } = req.params;
	const result = await contacts.removeContact(contactId)
	if (result === null) {
		res.status(404).json({ message: 'Not found' })
		return;
	}
	res.json({ message: "contact deleted" })
})

router.put('/:contactId', async (req, res, next) => {
	const { contactId } = req.params;
	const { name, email, phone } = req.body;

	const { error, value } = schema.validate({ name: name, email: email, phone: phone });

	if (error) {
		res.status(400).json({ message: error.details })
		return;
	}
	
	if (!name || !email || !phone) {
		res.status(400).json({ message: 'missing fields' })
		return;
	}
	const result = await contacts.updateContact(contactId, name, email, phone)
	res.json(result)
})

module.exports = router
