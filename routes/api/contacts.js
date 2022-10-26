const express = require('express');
// const contacts = require('../../models/contacts.json');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../src/models/contacts');

const router = express.Router();

// router.get('/', async (req, res, next) => {
//   listContacts(res);
//   // console.log('Contacts ', res.json(contacts));
//   // res.json({ message: 'template message' });
// });

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', updateContact);

module.exports = router;
