const express = require('express');
const { listContacts, getContactById, addContact } = require('../../services/contacts');

const router = express.Router();

router.get('/contacts', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: { contacts },
  });
  // res.status(200).json({ contacts });
});

router.get('/contacts/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);

  if (contactById === undefined) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json({
    status: 'success',
    code: 200,
    data: { contactById },
  });
});

router.post('/contacts', postContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (name === '' || name === null) {
    return res.status(400).json({ "message": "missing required name field" });
  };

  const contactId = Math.floor(Math.random() * 100);
  const contactsList = await listContacts();
  const isId = contactsList.some(contact => contact.id === contactId);
  if (isId) {
    postContact(req, res, next);
    return;
  }
  
  const contact = {
    id: contactId,
    name,
    email,
    phone,
  };

  addContact(contact);
  res.json({
    status: "success",
    code: 201,
    data: {contact},
  });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
