const express = require('express')
const router = express.Router()

const { listContacts, getContactById } = require('../../models/contacts')
//   // 
//   // removeContact,
//   // addContact,
//   // updateContact

router.get('/', listContacts)
// router.get('/', async (req, res) => { res.json({ message: 'get message' }) })

router.get('/:id', getContactById)
// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = { contactsRouter: router }
