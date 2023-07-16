import express from "express"
import { addContact, getContactById, removeContact, updateContact } from "../../models/contacts.js";
import HttpError from "../../helpers/HttpError.js";
import Joi from "joi";
import { listContactsController, getContactByIdController, addContactController, removeContactController } from "../../controllers/contacts.js";
import addContactValidation from "../../validators/contacts.js";

const router = express.Router();

const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required()
})

router.get('/', listContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', addContactValidation, [addContactController])
// router.post('/', addContactController)

router.delete('/:contactId', removeContactController)

router.put('/:contactId', async (req, res, next) => {
	if (Object.keys(req.body).length === 0) {
		return res.status(400).json({ "message": "missing fields" })
	}
	try {
		const { error } = contactAddSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message)
		}
		const contact = await updateContact(req.params.contactId, req.body);
		if (!contact) {
			throw HttpError(404, "Contact not found")
		}
		res.json(contact)
	} catch (error) {
		next(error)
	}
})

export default router