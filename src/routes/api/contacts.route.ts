import express from 'express';
import {
  getContactByIdValidation,
  addContactValidation,
  updateContactValidation,
  updateFavoriteValidation,
  getContactsValidation,
} from 'middlewares/contacts.validation.middleware';
import {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactByIdController,
  updateContactByIdController,
  updateFavoriteByIdController,
} from 'controllers/contacts.controller';
import { asyncWrapper } from 'helpers/apiHelpers';

const router = express.Router();

router.get('/', getContactsValidation, asyncWrapper(getContactsController));
router.post('/', addContactValidation, asyncWrapper(addContactController));
router
  .route('/:contactId')
  .get(getContactByIdValidation, asyncWrapper(getContactByIdController))
  .delete(getContactByIdValidation, asyncWrapper(deleteContactByIdController))
  .put([getContactByIdValidation, updateContactValidation], asyncWrapper(updateContactByIdController));
router.patch(
  '/:contactId/favorite',
  [getContactByIdValidation, updateFavoriteValidation],
  asyncWrapper(updateFavoriteByIdController)
);

export default router;
