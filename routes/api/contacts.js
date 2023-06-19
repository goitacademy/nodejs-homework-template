const express = require('express');

const router = express.Router();

const contacts = require('../../models/contacts');

const { HttpError } = require('../../helpers');

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    // return console.table(allContacts);
    res.json(allContacts);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contactById = await contacts.getContactById(id);
    if (!contactById) {
      // res.status(404).json({ message: 'Not found' });
      // const error = new Error('Not Found');
      // error.status = 404;
      // throw error;
      throw HttpError(404, 'Not found');
    }
    // console.log(contactById);
    res.json(contactById);
  } catch (error) {
    next(error);
    // const { status = 500, message = 'Server error' } = error;
    // res.status(status).json({ message });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await contacts.addContact({ name, email, phone });
    // return console.log(newContact);
    res.json(newContact);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const removingContact = await contacts.removeContact(id);
    // return console.log(removingContact);
    res.json(removingContact);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { name, email, phone } = req.body;
    const updatingContact = await contacts.updateContact(id, { name, email, phone });
    // return console.log(updatingContact);
    res.json(updatingContact);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
