import express from 'express'
import contactsController from '../../controllers/contacts-controller.js'

const router = express.Router()

router.get('/', contactsController.getAllContacts)

router.get('/:contactId', contactsController.getById)

router.post('/', contactsController.add)

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default router
