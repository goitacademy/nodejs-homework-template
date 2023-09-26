import { Router } from 'express';
import * as contactServises from '../../models/contacts.js';
const router = Router();

router.get('/', async (req, res, next) => {
  res.json(await contactServises.listContacts());
  // res.send(await contactServises.listContacts());
});

router.get('/:contactId', async (req, res, next) => {
  const id = req.url.substring(1);
  res.json(await contactServises.getContactById(id));
});

router.delete('/:contactId', async (req, res, next) => {
  const id = req.url.substring(1);
  res.json(await contactServises.removeContact(id));
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

export default router;
