const express = require('express');
const {
  addContactController,
  listContactsController,
  getContactController,
  deleteContactController,
  updateContactController,
  updateContactStatusController,
} = require('../controller');

const router = express.Router();

router.get('/', listContactsController);

router.get('/:contactId', getContactController);

router.post('/', addContactController);

router.delete('/:contactId', deleteContactController);

router.put('/:contactId', updateContactController);

router.patch('/:contactId/favorite', updateContactStatusController);

module.exports = router;
