const express = require('express')
const Joi = require('joi')

const router = express.Router()

const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require('../../models/contacts')

router.get('/', async (req, res, next) => {
	const contacts = await listContacts()
	res.status(200).json({ contacts })
})

router.get('/:contactId', async (req, res, next) => {
	const [contact] = await getContactById(req.params.contactId)
	if (!contact) {
		res.status(404).json({ message: 'Not found' })
	}
	res.status(200).json({ contact })
})

router.post('/', async (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string()
			.pattern(/^[a-zA-Zа-яА-ЯёЁ\s]+$/)
			.min(3)
			.max(20)
			.required(),
		phone: Joi.string()
			.length(10)
			.pattern(/^[0-9]+$/)
			.required(),
		email: Joi.string()
			.required()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ['com', 'net', 'uk', 'org'] },
			}),
	})
	const validatedResult = schema.validate(req.body)
	if (validatedResult.error) {
		res.status(400).json({
			status: validatedResult.error.details.map((x) => x.message),
			message: `missing required ${validatedResult.error.details.map(
				(x) => x.context.key
			)} field`,
		})
	}
	const newContact = await addContact(req.body)
	res.status(200).json({ newContact })
})

// router.delete('/:contactId', async (req, res, next) => {
// 	res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
// 	res.json({ message: 'template message' })
// })

module.exports = router
