const express = require('express');
const router = express.Router();
const Contacts = require('../../model/api');
const validate = require('./validation');

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.status(200).json({ contacts });
  } catch (e) {
    next(e);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ data: { contact } });
  } catch (e) {
    next(e);
  }
});

router.post('/', validate.addContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);

    if (!contact.name || !contact.email || !contact.phone) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    return res.status(201).json({ contact });
  } catch (e) {
    next(e);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ message: 'contact deleted' });
  } catch (e) {
    next(e);
  }
});

router.patch('/:contactId', validate.updateContact, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contacts.getContactById(contactId, next);
    if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }

    const updatedResult = await Contacts.updateContact(contactId, req.body);
    if (!req.body) {
      return res.status(400).json({ message: 'missing fields' });
    }
    return res.status(200).json(updatedResult);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
