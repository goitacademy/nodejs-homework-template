const express = require('express');
const router = express.Router();
const Contact = require('../../models/contactModel');
const authMiddleware = require('../../middleware/authMiddleware');


router.use(authMiddleware); 


router.get('/', async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contacts = await Contact.find({ owner: userId });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});


router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const userId = req.user._id; 
    const contact = await Contact.findOne({ _id: contactId, owner: userId });
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
    const userId = req.user._id; 
    const newContact = { ...req.body, owner: userId };
    const createdContact = await Contact.create(newContact);
    res.status(201).json(createdContact);
  } catch (error) {
    next(error);
  }
});


router.put('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const userId = req.user._id; 
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: userId },
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
    const userId = req.user._id; 
    const result = await Contact.findOneAndDelete({ _id: contactId, owner: userId });

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
