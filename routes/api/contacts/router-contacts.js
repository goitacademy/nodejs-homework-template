import { Router } from 'express';
import repositoryContacts from '../../../repository/repository-contacts';
import {
  validateCreate,
  validateId,
  validateUpdate,
  validateUpdateFavorite
} from './validation';

const router = new Router();

router.get('/', async (req, res, next) => {
  const contacts = await repositoryContacts.listContacts();
  console.log(contacts);
  res.json(contacts)
});

router.get('/:id', validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoryContacts.getContactById(id);
  contact ?
    res.status(200).json(contact) :
    res.status(404).json({ message: 'not found' });
});

router.post('/', validateCreate, async (req, res, next) => {
  const newContact = await repositoryContacts.addContact(req.body);
  res.status(201).json(newContact);
});

router.delete('/:id', validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoryContacts.removeContact(id)
  contact ?
    res.status(200).json({ contact }) :
    res.status(404).json({ message: 'Not found' });
});

router.put('/:id', validateId, validateUpdate, async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoryContacts.updateContact(id, req.body);
  contact ?
    res.status(200).json(contact) :
    res.status(404).json({ message: 'Not found' });
});

router.patch(
  '/:id/favorite',
  validateId,
  validateUpdateFavorite,
  async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoryContacts.updateContact(id, req.body);
  contact ?
    res.status(200).json(contact) :
    res.status(404).json({ message: 'Not found' });
});

export default router;
