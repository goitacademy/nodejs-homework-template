const express = require('express');
const router = express.Router();
const Contact = require('../../models/contacts');

const authMiddleware = require('../../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findOne({ _id: contactId, owner: req.user._id });
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { body } = req;

  try {
    const newContact = await Contact.create({ ...body, owner: req.user._id });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.findOneAndDelete({ _id: contactId, owner: req.user._id });
    if (result) {
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: req.user._id },
      body,
      { new: true }
    );
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:contactId/favorite', async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: 'Missing field favorite' });
  }

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: req.user._id },
      { favorite },
      { new: true }
    );
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
