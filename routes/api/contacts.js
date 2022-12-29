import express from 'express';
import contactsController from '../../controllers/controller.js';
import contactSchema from '../../schemas/contactSchema.js';
import { errorHandler } from '../../helpers/errorHandler.js';
import validateBody from '../../middleware/validation.js';

const router = express.Router();
const {
  getAllContacts,
  getContact,
  createContact,
  changeContact,
  deleteContact,
} = contactsController;

router.get('/', errorHandler(getAllContacts));
router.get('/:contactId', errorHandler(getContact));
router.post('/', validateBody(contactSchema), errorHandler(createContact));
router.put(
  '/:contactId',
  validateBody(contactSchema),
  errorHandler(changeContact)
);
router.delete('/:contactId', errorHandler(deleteContact));

export default router;
