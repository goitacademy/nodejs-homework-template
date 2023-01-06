import express from 'express';
import contactsController from '../../controllers/contactsController.js';
import contactSchema from '../../schemas/contactSchema.js';
import { errorWrapper } from '../../helpers/errorWrapper.js';
import validateBody from '../../middleware/validation.js';

const router = express.Router();
const {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController,
} = contactsController;

router.get('/', errorWrapper(getAllContactsController));
router.get('/:contactId', errorWrapper(getContactByIdController));
router.post(
  '/',
  validateBody(contactSchema),
  errorWrapper(addContactController)
);
router.put(
  '/:contactId',
  validateBody(contactSchema),
  errorWrapper(updateContactController)
);
router.delete('/:contactId', errorWrapper(deleteContactController));

export default router;
