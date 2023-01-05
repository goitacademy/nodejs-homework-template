const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts.js');
const router = express.Router();
const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email().min(3).max(30),
  phone: Joi.string()
    .min(7)
    .max(30)
    .pattern(/^\+|\d[0-9()]*\d$/, 'numbers'),
});

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  return res.json(contacts);
})

router.get('/:contactId', async (req, res, next) => {
  const  id  = req.params.contactId;
  const contact = await getContactById(id)
  if (!contact) {
    return res
      .status(404)
      .json({ message: `Contact with id ${id} is not found` })
  }
  return res.json(contact);
})

router.post('/', async (req, res, next) => {

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: 'Missing required name field' });
  }
  const newContact = await addContact(name, email, phone);
  return res.status(201).json(newContact)
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const deletedContact = await removeContact(id);
  if (!deletedContact) {
    return res
      .status(404)
      .json({ message: `Contact with id ${id} is not found` });
  }
  return res.json({ message: `Contact with id ${id} is deleted` });
})

router.put('/:contactId', async (req, res, next) => {

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  
  const { name, email, phone } = req.body;
  const  id  = req.params.contactId;

  if (!name && !email && !phone)
    return res.status(400).json({ message: 'missing fields' });
  const response = await updateContact(id, req.body);

  if (response) return res.json(response);
  return res
    .status(404)
    .json({ message: `Contact with id=${req.params.contactId} not found! `});
})

module.exports = router