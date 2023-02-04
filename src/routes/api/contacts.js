const express = require('express');

const router = express.Router();

const {
  toggleFavoriteSchema,
  updateContactSchema,
  addContactSchema,
} = require('../../schemas/validationContactsSchema');

const { validateBody } = require('../../middlewares/validateBody');

const {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  toggleFavoriteByIdController,
  deleteContactByIdController,
} = require('../../controllers/contactsController');

const ctrlWrapper = require('../../helpers/ctrlWrapper');

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '/',
  validateBody(addContactSchema),
  ctrlWrapper(createContactController)
);

router.put(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactByIdController)
);

router.patch(
  '/:contactId/favorite',
  validateBody(toggleFavoriteSchema),
  ctrlWrapper(toggleFavoriteByIdController)
);

router.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

module.exports = router;
