const express = require('express');
const { postSchema, putSchema, patchSchema } = require('../../schemas/contacts');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../models/contacts');
const mongoose = require('mongoose');

const router = express.Router();

router.use('/:contactId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    res.status(404).json({ message: 'Not found' });
  } else {
    next();
  }
});

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post(
  '/',
  (req, res, next) => {
    if (postSchema.validate(req.body).error) {
      res.status(400).json({ message: postSchema.validate(req.body).error.message });
    } else {
      next();
    }
  },
  async (req, res, next) => {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  }
);

router.delete('/:contactId', async (req, res, next) => {
  const removedContact = await removeContact(req.params.contactId);
  if (removedContact) {
    res.status(200).json({ message: 'contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put(
  '/:contactId',
  (req, res, next) => {
    if (putSchema.validate(req.body).error) {
      res.status(400).json({ message: putSchema.validate(req.body).error.message });
    } else {
      next();
    }
  },
  async (req, res, next) => {
    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  }
);

router.patch(
  '/:contactId',
  (req, res, next) => {
    if (patchSchema.validate(req.body).error) {
      res.status(400).json({ message: patchSchema.validate(req.body).error.message });
    } else {
      next();
    }
  },
  async (req, res, next) => {
    const updatedContact = await updateStatusContact(req.params.contactId, req.body);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  }
);

module.exports = router;
