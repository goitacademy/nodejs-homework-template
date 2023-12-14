import { Router } from 'express';
import * as serviceContacts from "../../models/contacts.js"; 

const router = Router();

router.get('/', async (req, res, next) => {
  const result = await serviceContacts.listContacts();
  res.json(result);
});

router.get('/:contactId', async (req, res, next) => {
  const result = await serviceContacts.getContactById("AeHIrLTr6JkxGE6SN-0Rw");
  res.json(result);
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
});

export default router;