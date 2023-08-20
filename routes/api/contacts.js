const express = require('express');
const router = express.Router();
const { 
  listContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController
} = require('../../controllers/contactController');
const { validateData } = require('../../schema/contactsSchema');

router.get('/', listContactsController);
router.get('/:contactId', getContactByIdController);
router.post('/', validateData, addContactController);
router.put('/:contactId', validateData, updateContactController);
router.delete('/:contactId', removeContactController);

module.exports = router;
