const express = require('express');

const contacts = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const list = await contacts.listContacts();
    res.json(list);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactById = await contacts.getContactById(req.params.contactId);
    if (!contactById) {
      throw HttpError(404, 'not found');
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const result = contacts.addContact(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    await contacts.removeContact(req.params.contactId);
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await contacts.updateContact(contactId, req.body);
    res.json({ message: 'template message' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
