const express = require('express');
const {
  listContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateStatusController
} = require('../../controllers/contacts-controller');

const { addContactValidator,
  updateContactValidator,
  updateStatusValidator
} = require('../../middlewars/validator');

const router = express.Router();

router
  .get('/', listContactsController)
  .get('/:contactId', getContactByIdController)
  .post('/', addContactValidator, addContactController)
  .delete('/:contactId', deleteContactController)
  .put('/:contactId', updateContactValidator, updateContactController)
  .patch(
  '/:contactId/favorite',
  updateStatusValidator,
  updateStatusController);

module.exports = router;