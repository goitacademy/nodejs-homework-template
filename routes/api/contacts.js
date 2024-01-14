import  { listContacts } from '../../models/contacts.js';   

import  express  from 'express';

const router = express.Router()

router.get('/', async (req, res, next) => {
 try {
  const contacts = await listContacts();
  res.json(contacts)
 } catch (e) {

 }
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export { router }
