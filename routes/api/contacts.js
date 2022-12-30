const express = require('express');
const { listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact 
} = require('../../models/contacts')

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts
    }
   })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  res.json({
    status: 'success',
    code: 200,
    data: { contact },
  });
})

router.post('/', async (req, res, next) => {
  const { name, phone, email } = req.body;
  const min = Math.ceil(1);
  const max = Math.floor(100);
  const contact = {
    id: Math.floor(Math.random() * (max - min)) + min,
    name,
    email,
    phone
  }
  const newContact = await addContact(contact);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { newContact },
  });
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.status(204).json();
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const { name, phone, email } = req.body;
  const newData = {
    name,
    email,
    phone
  };
  const updatedContact = await updateContact(contactId, newData);
  res.json({
    status: 'success',
    code: 200,
    data: { updatedContact },
  });
})

module.exports = router
