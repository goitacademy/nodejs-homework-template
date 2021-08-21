const express = require('express')
const router = express.Router()
const {
  getAllContacts,
  getById,
  addContact,
  updateContactById,
  delContactById
} = require('../../controllers/contacts')


router.get('/', getAllContacts)

router.get('/:contactId', getById)


router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
