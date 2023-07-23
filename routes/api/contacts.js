import express from "express"
import { listContactsController, getContactByIdController, addContactController, removeContactController, updateContactController, updateContactFavoriteController } from "../../controllers/contacts.js";
import schemas from "../../schemas/contacts-schemas.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody, isEmptyFavoriteBody, isValidId } from "../../middlewares/index.js";

const router = express.Router();

router.get('/', listContactsController)

router.get('/:contactId', isValidId, getContactByIdController)

router.post('/', isEmptyBody, validateBody(schemas.addContactSchema), addContactController)

router.delete('/:contactId', isValidId, removeContactController)

router.put('/:contactId', isValidId, isEmptyBody, validateBody(schemas.addContactSchema), updateContactController)

router.patch('/:contactId/favorite', isValidId, isEmptyFavoriteBody, validateBody(schemas.contactUpdateFavoriteSchema), updateContactFavoriteController)

export default router