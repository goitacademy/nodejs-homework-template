import express from 'express'

import contactsServise from '../../models/contacts/contacts.js'
const contactsRouter = express.Router()

contactsRouter.get('/', async (req, res, next) => {
	try {
		const result = await contactsServise.listContacts()
	res.json(result)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
})

contactsRouter.get('/:contactId', async (req, res, next) => {
	res.json({ message: 'template message' })
})

contactsRouter.post('/', async (req, res, next) => {
	res.json({ message: 'template message' })
})

contactsRouter.delete('/:contactId', async (req, res, next) => {
	res.json({ message: 'template message' })
})

contactsRouter.put('/:contactId', async (req, res, next) => {
	res.json({ message: 'template message' })
})

export default contactsRouter
