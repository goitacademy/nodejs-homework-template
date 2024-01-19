const express = require('express');
const router = express.Router();
const Contact = require('./models/contacts'); 


router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
});


router.delete('/:contactId', async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.contactId);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    next(err);
  }
});


router.put('/:contactId', async (req, res, next) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (err) {
    next(err);
  }
});

module.exports = router;