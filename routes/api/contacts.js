const express = require('express');
const {  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact} = require('../../models/contacts')


const router = express.Router()

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.get('/', listContacts)

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.get('/:contactId', getContactById)

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.post('/', addContact)

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.delete('/:contactId', removeContact)

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.put('/:contactId', updateContact)

module.exports = router
