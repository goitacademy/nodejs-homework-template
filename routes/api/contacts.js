import express from "express"
import { listContactsController, getContactByIdController, addContactController, removeContactController, updateContactController } from "../../controllers/contacts.js";
import { addContactValidation, updateContactValidation } from "../../validators/contacts.js";

const router = express.Router();

router.get('/', listContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', addContactValidation, addContactController)

router.delete('/:contactId', removeContactController)

router.put('/:contactId', updateContactValidation, updateContactController)

export default router