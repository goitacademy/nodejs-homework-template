const express = require('express');

const router = express.Router();
const contacts = require('../../models');
const validateFields = require('../../middleware');

router.get('/', async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', validateFields, async (req, res, next) => {
  try {
    const results = await contacts.addContact(req.body);
    if (!results) {
      res.status(400).json({ message: 'missing required name field' });
    }
    res.status(201).json(results);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await contacts.removeContact(contactId);

    if (!contact) {
      res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', validateFields, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const updatedContact = await contacts.updateContact(contactId, {
      name,
      email,
      phone,
    });

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
