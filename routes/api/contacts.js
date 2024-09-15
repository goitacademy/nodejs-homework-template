const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const Contact = require('../../models/contacts');


router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newContact = new Contact({ ...req.body, owner: req.user._id });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndRemove(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

module.exports = router;
