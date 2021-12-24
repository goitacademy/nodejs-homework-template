import express from 'express';
import model from '../../model/index';
import { validateCreate, validateId, validateUpdate } from './validation';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await model.listContacts();
  res.json(contacts)
});

router.get('/:id', validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.getContactById(id);
  contact ?
    res.status(200).json(contact) :
    res.status(404).json({ message: 'not found' });
});

router.post('/', validateCreate, async (req, res, next) => {
  const newContact = await model.addContact(req.body);
  res.status(201).json(newContact);
});

router.delete('/:id', validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.removeContact(id)
  contact ?
    res.status(200).json({ message: 'contact deleted' }) :
    res.status(404).json({ message: 'Not found' });
});

router.put('/:id', validateId, validateUpdate, async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.updateContact(id, req.body);
  contact ?
    res.status(200).json(contact) :
    res.status(404).json({ message: 'Not found' });
});

export default router;
