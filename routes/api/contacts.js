const express = require('express');
const {
  addContactValidation,
  putContactValidation,
  patchContactFavoriteValidation,
} = require('../../middlewares/validationMiddleware');
const { isValidId } = require('../../middlewares/validationIdMiddleware');
const {
  listContactsController,
  getContactByIdController,
  addContactValidationController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require('../../controllers/contactsController');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const { authMiddleware } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', asyncWrapper(listContactsController));

router.get('/:contactId', isValidId, asyncWrapper(getContactByIdController));

router.post('/', addContactValidation, asyncWrapper(addContactValidationController));

router.delete('/:contactId', isValidId, asyncWrapper(removeContactController));

router.put('/:contactId', isValidId, putContactValidation, asyncWrapper(updateContactController));

router.patch(
  '/:contactId/favorite',
  isValidId,
  patchContactFavoriteValidation,
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
