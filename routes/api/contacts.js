const express = require('express');
const router = express.Router();
const Contact = require('../../model');
const { createUserValidation, updateUserValidation } = require('./validation');

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await Contact.listContacts();
    return res.json({ contacts });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contact.getContactById(req.params.contactId);
    if (!contact) {
      res.status(404).json({ message: 'Not found' });
    }
    return res.json({ contact });
  } catch (error) {
    next(error);
  }
});

router.post('/', createUserValidation, async (req, res, next) => {
  try {
    const contact = await Contact.addContact(req.body);
    if (!contact) {
      return res.status(400).json({ message: 'missing required name field' });
    }
    return res.status(201).json({ contact });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contact.removeContact(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId', updateUserValidation, async (req, res, next) => {
  try {
    // if (!req.body?.name || !req.body?.email || !req.body?.phone) {
    //   return res.status(404).json({ message: 'missing fields' });
    // }
    const contact = await Contact.updateContact(req.params.contactId, req.body);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ contact });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
