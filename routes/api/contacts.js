import { nanoid } from 'nanoid';
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from '../../models/contacts.js';
import { Router } from 'express';
import Joi from 'joi';

const router = Router();

const reqBodySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(6).max(20).required(),
});

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
  const { value, error } = reqBodySchema.validate(req.body);
  const { name, email, phone } = value;

  if (!!error) {
    res.status(400).json({ message: error.message });
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
  const { value, error } = reqBodySchema.validate(req.body);
  const { name, email, phone } = value;

  if (!!error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const { id } = req.params;

  const updatedContact = await updateContact(id, name, email, phone);
  !updatedContact
    ? res.status(404).json({ message: `Contact with ID: ${id} not found` })
    : res.json({ updatedContact });
});

export default router;
