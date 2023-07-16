const express = require('express');
const {
  ctrlListContacts,
  ctrlAddContact,
  ctrlGetContactById,
  ctrlRemoveContact,
  ctrlUpdateContact,
} = require('../../controllers/ctrlContacts');

const router = express.Router();

router.get('/', ctrlListContacts);

router.post('/', ctrlAddContact);

router.get('/:contactId', ctrlGetContactById);

router.delete('/:contactId', ctrlRemoveContact);

router.put('/:contactId', ctrlUpdateContact);

module.exports = router;
