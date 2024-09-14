const express = require('express');
const Joi = require('joi');
const auth = require('../../middlewares/auth');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../models/contacts');

const router = express.Router();

router.use(auth);

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).or('name', 'email', 'phone');

router.get('/', async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contacts = await listContacts(userId);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const newContact = await addContact({
      ...req.body,
      owner: req.user._id,
    });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { contactId } = req.params;

    const contact = await removeContact(contactId, userId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing fields' });
    }

    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.status(400).json({ message: 'missing field favorite' });
    }

    const updatedContact = await updateStatusContact(contactId, { favorite });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
