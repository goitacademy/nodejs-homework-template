const express = require('express');

const router = express.Router();
const contacts = require('../../models/contacts');
const validateFields = require('../../middleware');

router.get('/', async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    // res.status(200).json({ msg: 'Success', data });
    return res.status(200).json(data);
  } catch (error) {
    next(error.message);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw new Error(404);
    }
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: 'Not found' });
  }
});

router.post('/', validateFields, async (req, res) => {
  try {
    const results = await contacts.addContact(req.body);
    res.status(201).json(results);
  } catch (error) {
    res.status(400).json({ message: 'missing require name field' });
  }
});

router.delete('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.removeContact(contactId);

    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:contactId', validateFields, async (req, res) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const updatedContact = await contacts.updateContact(contactId, {
      name,
      email,
      phone,
    });

    if (!updatedContact) {
      return res.status(400).json({ message: 'missing fields' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;
