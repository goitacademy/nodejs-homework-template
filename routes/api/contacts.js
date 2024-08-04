const express = require('express');
const auth = require('../middleware/auth');
const Contact = require('../models/contact');
const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({ _id: id, owner: req.user._id });
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, favorite } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      favorite,
      owner: req.user._id,
    });

    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOneAndDelete({ _id: id, owner: req.user._id });
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;

    if (!name && !email && !phone && favorite === undefined) {
      return res.status(400).json({ message: 'missing fields' });
    }

    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      { name, email, phone, favorite },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id/favorite', async (req, res) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.status(400).json({ message: 'missing field favorite' });
    }

    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      { favorite },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;