import { nanoid } from 'nanoid';
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from '../../models/contacts.js';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const searchedContact = await getContactById(id);
  !searchedContact
    ? res.json({ message: `We do not have contact with ID: ${id} in DB` })
    : res.json({ searchedContact });
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!(name && email && phone)) {
    !name
      ? res.status(400).json({ message: `missing required name - field` })
      : !email
      ? res.status(400).json({ message: `missing required email - field` })
      : res.status(400).json({ message: `missing required phone - field` });
    return;
  }

  const newId = nanoid();
  const createdContact = await addContact(newId, name, email, phone);
  res.status(201).json({ createdContact });
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const searchedContact = await removeContact(id);
  console.log(searchedContact);
  !searchedContact
    ? res.status(404).json({ message: `Contact with ID: ${id} not found` })
    : res.json({ deletedContact: searchedContact });
});

router.put('/:id', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { id } = req.params;

  if (!(name && email && phone)) {
    !name
      ? res.status(400).json({ message: `missing required name - field` })
      : !email
      ? res.status(400).json({ message: `missing required email - field` })
      : res.status(400).json({ message: `missing required phone - field` });
    return;
  }

  const updatedContact = await updateContact(id, name, email, phone);
  !updatedContact
    ? res.status(404).json({ message: `Contact with ID: ${id} not found` })
    : res.json({ updatedContact });
});

export default router;
