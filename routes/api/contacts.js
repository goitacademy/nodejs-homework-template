const express = require('express')

const router = express.Router()
const Joi = require('joi');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../api/models/contact')

function validateContact(contact) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  return schema.validate(contact);
}

router.get('/api/contacts', async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
});


router.get('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});


router.post('/api/contacts', async (req, res) => {
  const { error } = validateContact(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  }
});


router.delete('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (contact) {
    await removeContact(id);
    res.json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});


router.put('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = validateContact(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    const updatedContact = await updateContact(id, req.body);

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  }
});

module.exports = router
