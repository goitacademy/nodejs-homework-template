const express = require('express');
const { authMiddleware } = require("../../middlewares/index");

const {
  getContactsController,
  getContactDataByIdController,
  addNewContactController,
  deleteContactByIdController,
  updateContactByIdController,
  updateStatusContactController,
} = require('../../controllers/contacts/index');

const { asyncWrapper } = require("../../helper/index");

const {addContactValidation, updateStatusContactValidation, updateContactValidation } = require('../../middlewares/index');

const router = express.Router();

router.use(authMiddleware);

router.get('/', asyncWrapper(getContactsController));
router.get('/:contactId', asyncWrapper(getContactDataByIdController));
router.post('/', addContactValidation, asyncWrapper(addNewContactController));
router.delete('/:contactId', asyncWrapper(deleteContactByIdController));
router.put('/:contactId', updateContactValidation, asyncWrapper(updateContactByIdController));
router.patch('/:contactId/favorite', updateStatusContactValidation, asyncWrapper(updateStatusContactController));

module.exports = { contactsRouter: router };