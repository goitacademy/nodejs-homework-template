const express = require('express');
const {
  addContactValidation,
  updateContactValidation,
} = require('../../middlewares/validationMiddleware');
const {
  getContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  changeContactByIdController,
  updateStatusContactController,
} = require('../../controllers/contactsControllers');
const { asyncWrapper } = require('../../helpers/apiHelpers');

const router = express.Router();

router.get('/', asyncWrapper(getContactsController));

router.get('/:contactId', asyncWrapper(getContactByIdController));

router.post('/', addContactValidation, asyncWrapper(addContactController));

router.delete('/:contactId', asyncWrapper(removeContactController));

router.put(
  '/:contactId',
  updateContactValidation,
  asyncWrapper(changeContactByIdController)
);

// router.patch('/:contactId', updateStatusContactController);
router.patch(
  '/:contactId/favorite',
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
