const express = require('express')
const router = express.Router()

const {
  getContact,
  findContactById,
  deleteContact,
  updateContact,
  addContact,
  validTokenUser,
} = require('../src/index')

router.use('/', validTokenUser)

router.get('/contacts', getContact)

router.get('/contacts/:contactId', findContactById)

router.post('/contacts', addContact)

router.delete('/contacts/:contactId', deleteContact)

router.patch('/contacts/:contactId', updateContact)

module.exports = router
