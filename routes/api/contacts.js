import express from "express"
import { listContactsController, getContactByIdController, addContactController, removeContactController, updateContactController } from "../../controllers/contacts.js";
import schemas from "../../schemas/contacts-schemas.js";
import { validateBody } from "../../decorators/index.js";


const router = express.Router();

router.get('/', listContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', validateBody(schemas.addContactSchema), addContactController)

router.delete('/:contactId', removeContactController)

router.put('/:contactId', validateBody(schemas.addContactSchema), updateContactController)

export default router