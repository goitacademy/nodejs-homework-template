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
router.post('/', addContactValidation, asyncWrapper(addContactController));
router
  .route('/:contactId')
  .get(getContactByIdValidation, asyncWrapper(getContactByIdController))
  .delete(getContactByIdValidation, asyncWrapper(deleteContactByIdController))
  .put([getContactByIdValidation, updateContactValidation], asyncWrapper(updateContactByIdController));

export default router;
