// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };

const express = require('express');

const router = express.Router();

const contacts = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  // return console.table(allContacts);
  res.json(allContacts);
});

router.get('/:contactId', async (contactId, res, next) => {
  const contactById = await contacts.getContactById(contactId);
  console.log(contactById);
  res.json(contactById);
});

router.post('/', async ({ name, email, phone }, res, next) => {
  const newContact = await contacts.addContact({ name, email, phone });
  // return console.log(newContact);
  res.json(newContact);
});

router.delete('/:contactId', async (contactId, res, next) => {
  const removingContact = await contacts.removeContact(contactId);
  // return console.log(removingContact);
  res.json(removingContact);
});

router.put('/:contactId', async (req, res, next) => {
  const updatingContact = await contacts.updateContact(id, { name, email, phone });
      // return console.log(updatingContact);
  res.json(updatingContact);
});

module.exports = router;
