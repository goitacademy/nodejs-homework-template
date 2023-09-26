import { Router } from 'express';
import * as contactServises from '../../models/contacts.js';
const router = Router();

router.get('/', async (req, res, next) => {
  const result = res.json(await contactServises.listContacts());
  // try {
  // if (!result) {
  //   return res.status(404).json({ message: 'Not found' });
  // }

  return result;
  // } catch (error) {
  //   res.status(500).json({ message: 'Server error' });
  // }
});

router.get('/:contactId', async (req, res, next) => {
  // try {
  const id = req.url.substring(1);
  const result = res.json(await contactServises.getContactById(id));
  console.log('result', result);
  // if (!result) {
  //   return res.status(404).json({ message: 'Not found' });
  // }
  return result;
  // } catch (error) {
  //   res.status(500).json({ message: 'Server error' });
  // }
});

router.delete('/:contactId', async (req, res, next) => {
  // try {
  const id = req.url.substring(1);
  res.json(await contactServises.removeContact(id));
  // } catch (error) {
  //   res.status(500).json({ message: 'Server error' });
  // }
});

router.post('/', async (req, res, next) => {
  // try {

  res.json(await contactServises.addContact(req.body));
  // } catch (error) {
  //   res.status(500).json({ message: 'Server error' });
  // }
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

export default router;
