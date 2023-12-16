import express from 'express';
import { getAll, getById } from '../../controllers/contact-controllers.js';

const router = express.Router()

router.get('/', getAll());

router.get('/:contactId',getById)

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
