import { Router } from 'express';
import {
  listContacts,
  addContact,
  removeContact,
  getContactById,
  updateContact,
} from '../../models/contacts.js';
import { schemas } from '../../validators/schemas.js';
import { validate } from '../../validators/validator.js';

const router = Router();

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  if (contacts) {
    res.json({ contacts });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:contactId', async (req, res, next) => {
  const foundContact = await getContactById(req.params.contactId);
  if (foundContact) {
    res.json(foundContact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', validate(schemas.updateContact), async (req, res, next) => {
  const newContact = await addContact(req.body);
  if (newContact) {
    res.status(201).json(newContact);
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const result = await removeContact(req.params.contactId);
  if (result) {
    res.json({ message: 'contact deleted' });
  } else if (result === false) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:contactId', validate(schemas.updateContact), async (req, res, next) => {
  const updatedContact = await updateContact(req.params.contactId, req.body);
  if (updatedContact) {
    res.json(updatedContact);
  } else if (updatedContact === false) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
