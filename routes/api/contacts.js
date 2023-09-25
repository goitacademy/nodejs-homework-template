import express, { Router } from 'express';
import * as contactServises from '../../models/contacts.js';
const router = Router();

router.get('/', async (req, res, next) => {
  // res.send(contactServises.listContacts());
  const a = await contactServises.listContacts();
  console.log('a', a);
  // res.json(contactServises.listContacts());
});

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

export default router;
