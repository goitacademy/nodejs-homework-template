import express from "express"
import { getContactById, listContacts, removeContact } from "../../models/contacts.js";
import HttpError from "../../helpers/HttpError.js";

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const list = await listContacts()
		res.json(list)
	} catch (error) {
		// res.status(500).json({
		// 	"message": "Server error"
		// })
		next(error)
	}
})

router.get('/:contactId', async (req, res, next) => {
	try {
		const contact = await getContactById(req.params.contactId)
		if (!contact) {
			throw HttpError(404, "Contact not found")
		}
		res.json(contact)
	} catch (error) {
		// const { status = 500, message = "Server error" } = error;
		// res.status(status).json({
		// 	message
		// })
		next(error);
	}
})

router.post('/', async (req, res, next) => {
	res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
	const contact = await removeContact(req.params.contactId);
	res.json(contact)
})

router.put('/:contactId', async (req, res, next) => {
	res.json({ message: 'template message' })
})

export default router