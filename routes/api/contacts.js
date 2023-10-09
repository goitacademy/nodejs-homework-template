// contacts.js
const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts'); 

// GET /api/contacts
router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

// GET /api/contacts/:id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(Number(id));
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

// POST /api/contacts
router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/contacts/:id
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await removeContact(Number(id));
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

// PUT /api/contacts/:id
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  try {
    const updatedContact = await updateContact(Number(id), {
      name,
      email,
      phone,
    });
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});
// PATCH /api/contacts/:contactId/favorite
router.patch('/:contactId/favorite', async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    if (typeof favorite !== 'boolean') {
      return res.status(400).json({ message: 'Missing field "favorite"' });
    }

    const updatedContact = await updateContact(contactId, { favorite });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
