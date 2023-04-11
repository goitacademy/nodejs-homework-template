import express from 'express';
import { listContacts, getContactById, removeContact, addContact, updateContact } from '../../db/contacts.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);
    res.json(contact);
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    await removeContact(req.params.id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    next(error);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.json(newContact);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const contactId = req.params.id;
  const body = req.body;
  try {
    const updatedContact = await updateContact(contactId, body);
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

export default router;




