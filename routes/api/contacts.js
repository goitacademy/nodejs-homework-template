const express = require('express');

const router = express.Router();

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
} = require('../../controllers/contactController');

const {
  createContactSchema,
  changeContactSchema,
} = require('../../middlewares/validationMiddleware');

router.get('/', getContactsController);

router.get('/:contactId', getContactByIdController);

router.post('/', createContactSchema, addContactController);

router.delete('/:contactId', removeContactController);

router.put('/:contactId', changeContactSchema, updateContactController);

module.exports = router;
