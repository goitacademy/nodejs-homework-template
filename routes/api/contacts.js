const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../models/contacts');

const baseSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const validate = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: `Validation error: ${error.details.map(detail => detail.message).join(', ')}` });
  }
  next();
};

const checkRequiredFields = (fields, req, res, next) => {
  for (const field of fields) {
    if (!req.body[field]) {
      return res.status(400).json({ message: `Validation error: missing required field ${field}` });
    }
  }
  next();
};

router.get('/', async (req, res) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await getById(id);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', (req, res, next) => validate(baseSchema, req, res, next), (req, res, next) => checkRequiredFields(['name', 'email', 'phone'], req, res, next), async (req, res) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const success = await removeContact(id);
    if (success) {
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', (req, res, next) => validate(baseSchema, req, res, next), (req, res, next) => checkRequiredFields(['name', 'email', 'phone'], req, res, next), async (req, res) => {
  const { id } = req.params;
  try {
    const updatedContact = await updateContact(id, req.body);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id', (req, res, next) => validate(baseSchema, req, res, next), (req, res, next) => {
  if (!req.body.name && !req.body.email && !req.body.phone) {
    return res.status(400).json({ message: 'Validation error: at least one field (name, email, phone) must be provided' });
  }
  next();
}, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedContact = await updateContact(id, req.body);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id/favorite', (req, res, next) => validate(baseSchema, req, res, next), (req, res, next) => {
  if (req.body.favorite === undefined) {
    return res.status(400).json({ message: 'Validation error: missing field favorite' });
  }
  next();
}, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedContact = await updateStatusContact(id, req.body.favorite);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;







