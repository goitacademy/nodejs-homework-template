
const express = require('express');
const router = express.Router();
const Contact = require('../../models/contactModel');


router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});


router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    console.log('Requested contactId:', contactId);

    const contact = await Contact.findById(contactId);
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
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});


router.put('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
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
    const contactId = req.params.contactId;
    const result = await Contact.findByIdAndDelete(contactId);

    if (result) {
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
