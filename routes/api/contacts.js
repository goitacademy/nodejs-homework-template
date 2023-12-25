const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const allContacts = await listContacts();
  res.json(allContacts);
  // res.json({ message: 'template message' })
});

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
  // res.json({ message: 'template message' })
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    const contact = await addContact({ name, email, phone });
    res.json(contact);
  } else {
    res.status(400).json({ message: 'missing required name field' });
  }
  // res.json({ message: 'template message' })
});

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const deletedContact = await removeContact(contactId);

  if (deletedContact) {
    res.status(200).json({ message: 'contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
  // res.json({ message: 'template message' })
});

router.put('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  const updatedContact = await updateContact(contactId, body);
  res.json(updatedContact);
  // res.json({ message: 'template message' })
});

module.exports = router;
