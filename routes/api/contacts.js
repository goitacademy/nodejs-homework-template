const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');
const { postSchema, putSchema } = require('../../schemas/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ contacts });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId);
    !contactById
      ? res.status(404).json({ message: 'Not found' })
      : res.json({ contactById });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { value, error } = postSchema.validate(req.body);
    if (error) return res.status(400).json(error.message);

    const addedContact = await addContact(value);
    addedContact.message
      ? res.status(400).json({ message: 'Contact already exists' })
      : res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactToDelete = await removeContact(req.params.contactId);
    if (!contactToDelete) return res.status(404).json({ message: 'Not found' });

    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length)
      return res.status(400).json({ message: 'Missing fields to update' });

    const { value, error } = putSchema.validate(req.body);
    if (error) return res.status(400).json(error.message);
    const result = await updateContact(req.params.contactId, value);
    if (!result) return res.status(404).json({ message: 'Not found' });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
