const express = require('express');
const router = express.Router();

const contactsOperations = require('../../model/contactsOperations.js');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contacts = await contactsOperations.getContactById(contactId);
    if (!contacts) {
      return res.status(404).json({ message: 'Not found', code: 404 });
    }
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const contactsAdd = await contactsOperations.addContact(req.body);

    res.status(201).json(contactsAdd);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
