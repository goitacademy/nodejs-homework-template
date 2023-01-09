const express = require('express');
const api = require('../../models/contacts');
const Joi = require('joi');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contactsList = await api.listContacts();
    res.json({ contactsList, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const searchedContact = await api.getContactById(req.params.contactId);

    if (!searchedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({ searchedContact, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      phone: Joi.number().integer().min(7).max(15).required(),
    });

    const validatedResult = schema.validate(req.body);
    if (validatedResult.error) {
      return res.status(400).json({ message: validatedResult.error.details });
    }

    const newContact = await api.addContact({ name, email, phone });
    res.status(201).json({ newContact, status: 201 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await api.removeContact(req.params.contactId);
    if (!result) {
      res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'contact deleted', status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'missing fields' });
    }
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      phone: Joi.number().integer().min(7).max(15).required(),
    });

    const validatedResult = schema.validate(req.body);
    if (validatedResult.error) {
      return res.status(400).json({ message: validatedResult.error.details });
    }

    const updatedContact = await api.updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ updatedContact, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
