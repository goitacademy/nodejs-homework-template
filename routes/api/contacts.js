const express = require('express');
const router = express.Router();
const Contact = require('../../models/contacts');
const Joi = require('joi');
const authMiddleware = require('../../middleware/auth');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

router.use(authMiddleware);
router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user.userId });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findOne({ _id: contactId, owner: req.user.userId });
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newContact = await Contact.create({ ...req.body, owner: req.user.userId });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: req.user.userId },
      req.body,
      { new: true }
    );
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findOneAndDelete({ _id: contactId, owner: req.user.userId });
    if (deletedContact) {
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: req.user.userId },
      { favorite },
      { new: true }
    );

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
