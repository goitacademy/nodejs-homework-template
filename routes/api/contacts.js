const express = require('express');
const Joi = require('joi');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

// Что бы не писать в каждом маршруте /api/contacts или /api/contacts/:contactId мы прописываем этот маршрут сразу в app.js при подключении раутера app.use('/api/contacts', contactsRouter). Так что "/" === /api/contacts в данном случае.

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .min(5)
    .max(35),

  phone: Joi.string().min(5).max(15).required(),
});

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  res.json(contact);
});

router.post('/', async (req, res, next) => {
  const validationBody = schema.validate(req.body);
  if (validationBody.error) {
    console.log(validationBody.error);
    return res.status(400).json({ message: 'missing required name field' });
  }

  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

router.delete('/:contactId', async (req, res, next) => {
  const removedContact = await removeContact(req.params.contactId);
  if (removedContact.length === 0) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json({ message: 'contact deleted' });
});

router.put('/:contactId', async (req, res, next) => {
  const validationBody = schema.validate(req.body);
  if (validationBody.error) {
    return res.status(400).json({ message: 'missing fields' });
  }

  const updatedContact = await updateContact(req.params.contactId, req.body);

  if (!updatedContact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(updatedContact);
});

module.exports = router;
