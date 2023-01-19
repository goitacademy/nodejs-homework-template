import express from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  updateContactStatusController,
  deleteContactController,
} from '../../controllers/contactsController.js';
import { contactSchema } from '../../schemas/contactSchema.js';
import { contactStatusSchema } from '../../schemas/contactStatusSchema.js';
import { errorWrapper } from '../../helpers/errorWrapper.js';
import { validateBody } from '../../middleware/validateBody.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); // restricted routes

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
router.patch(
  '/:contactId/favorite',
  validateBody(contactStatusSchema),
  errorWrapper(updateContactStatusController)
);
router.delete('/:contactId', errorWrapper(deleteContactController));

export default router;
