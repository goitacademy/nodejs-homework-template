import express from 'express';
import {
  getContactByIdValidation,
  addContactValidation,
  updateContactValidation,
} from 'middlewares/contacts.validation.middleware';
import {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactByIdController,
  updateContactByIdController,
} from 'controllers/contacts.controller';
import { asyncWrapper } from 'helpers/apiHelpers';

const router = express.Router();

router.get('/', asyncWrapper(getContactsController));
router.get('/:contactId', getContactByIdValidation, asyncWrapper(getContactByIdController));
router.post('/', addContactValidation, asyncWrapper(addContactController));
router.delete('/:contactId', getContactByIdValidation, asyncWrapper(deleteContactByIdController));
router.put(
  '/:contactId',
  [getContactByIdValidation, updateContactValidation],
  asyncWrapper(updateContactByIdController)
);

export default router;
