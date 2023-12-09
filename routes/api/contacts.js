const express = require('express');
const contacts = require('../../contacts');
const Joi = require('joi');


const router = express.Router();

router.get('/', async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const contact = await contacts.getContactById(id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.message });
  }

  const { name, email, phone } = req.body;
  const newContact = await contacts.addContact(name, email, phone);
  res.status(201).json(newContact);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedCont = await contacts.removeContact(id);

  if (deletedCont) {
    res.json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:id', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.message });
  }

  const { id } = req.params;
  const updatedFields = req.body;

  if (!Object.keys(updatedFields).length) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const updatedCont = await contacts.updateContact(id, updatedFields);

  if (updatedCont) {
    res.json(updatedCont);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});


module.exports = router;