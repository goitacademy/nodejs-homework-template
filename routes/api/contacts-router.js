import express from 'express';
import contactsService from '../../models/index.js'


const router = express.Router();
router.get('/', async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result)
})

router.get('/:contactId', async (req, res, next) => {
  const result = await contactsService.getContactById(contactId);
  res.json(result)
})

router.post('/', async (req, res, next) => {
  const result = await contactsService.updateContactById(contactId);
  res.json(result)
})

router.delete('/:contactId', async (req, res, next) => {
  const result = await contactsService.removeContact(body);
  res.json(result)
})

router.put('/:contactId', async (req, res, next) => {
  const result = await contactsService.addContact(body, contactId);
  res.json(result)
})

export default router;
