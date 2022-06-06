const express = require('express')
const router = express.Router()
const {
  getList,
  getContact,
  addContactController,
  updateContactController,
  deleteContact
} = require('../../src/controllers/contactsControllers')

const {
  updateContactValidation,
  addContactValidation
} = require('../../src/middlewares/validationMiddleware')

router.get('/', getList)

router.get('/:contactId', getContact)

router.post('/', addContactValidation, addContactController)

router.put('/:contactId', updateContactValidation, updateContactController)

router.delete('/:contactId', deleteContact)

module.exports = router
