const express = require('express');
const router = express.Router();
const Contact = require('../../models/contacts');

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
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

  if (!body.name || !body.email || !body.phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newContact = await Contact.create(body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(contactId);
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

  if (!body.name || !body.email || !body.phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true });
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
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
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
