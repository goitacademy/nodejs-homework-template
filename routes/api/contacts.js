const express = require('express')
const router = express.Router()
const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  changeContactController
} = require('../../controllers')
const contactValidator = require('../../middlewares/validatorCreation')

router.get('/', listContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', contactValidator, addContactController)

router.delete('/:contactId', removeContactController)

router.patch('/:contactId', changeContactController)

module.exports = router
