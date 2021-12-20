import { Router } from 'express';
const router = new Router();
import model from '../../model/index';
import { validateCreate, validateUpdate, validateId } from './validation';

router.get('/', async (req, res, next) => {
  const contacts = await model.listContacts();
  res.status(200).json(contacts);
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.getById(id);
  if (contact) {
    return res.status(200).json(contact);
  };
  res.status(404).json({ message: 'not found' });
})

router.post('/', validateCreate, async (req, res, next) => {
  const newContact = await model.addContact(req.body);
  res.status(201).json(newContact);
})

router.delete('/:id', validateId, async (req, res, next) => {
  const { id } = req.params;
  const deletedContact = await model.removeContact(id);
  if (deletedContact) {
    res.status(200).json({ message: 'contact deleted' });
  }
  res.status(404).json({ message: 'Not found' });
})

router.put('/:id', validateUpdate, async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await model.updateContact(id, req.body);
  if (updatedContact) {
    return res.status(200).json(updatedContact);
  };
  res.status(404).json({ message: 'not found' });
})

export default router;
