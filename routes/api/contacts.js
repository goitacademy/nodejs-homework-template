import express from "express"
import { listContacts } from "../../src/contacts.js"


const router = express.Router()

router.get('/', async (req, res, next) => {
	const list = await listContacts();
	// res.json({ message: 'template message' })
	res.json(list)
})

router.get('/:contactId', async (req, res, next) => {
	res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
	res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
	res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
	res.json({ message: 'template message' })
})

export default router