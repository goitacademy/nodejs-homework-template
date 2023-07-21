import express from "express"
import { listContactsController, getContactByIdController, addContactController, removeContactController, updateContactController } from "../../controllers/contacts.js";
import schemas from "../../schemas/contacts-schemas.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody } from "../../middlewares/index.js";



const router = express.Router();

router.get('/', listContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', isEmptyBody, validateBody(schemas.addContactSchema), addContactController)

router.delete('/:contactId', removeContactController)

router.put('/:contactId', isEmptyBody, validateBody(schemas.addContactSchema), updateContactController)

export default router