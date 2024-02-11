const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require('../../models/contacts');

router.get('/', async (req, res) => {
  try {
    const allContacts = await listContacts();
    res.json(allContacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedContact = await updateContact(id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContactId = await removeContact(id);
    if (!deletedContactId) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ id: deletedContactId, message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:contactId/favorite', async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    return res.status(400).json({ message: 'Missing field favorite' });
  }

  try {
    const updatedContact = await updateStatusContact(contactId, favorite);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
