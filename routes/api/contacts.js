const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');
const auth = require('../../middleware/auth');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

router.post('/', auth, async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newContact = await addContact({ ...req.body, owner: req.user._id });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.get('/', auth, async (req, res, next) => {
  try {
    const contacts = await listContacts(req.user._id);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id, req.user._id);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updatedContact = await updateContact(req.params.id, req.user._id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const removedContact = await removeContact(req.params.id, req.user._id);
    if (!removedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/favorite', auth, async (req, res, next) => {
  try {
    const { error } = favoriteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updatedContact = await updateContact(req.params.id, req.user._id, { favorite: req.body.favorite });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
