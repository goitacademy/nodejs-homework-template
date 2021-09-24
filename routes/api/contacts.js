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
const contactValidatorChanges = require('../../middlewares/validatorChanges')

router.get('/', listContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', contactValidator, addContactController)

router.delete('/:contactId', removeContactController)

router.put('/:contactId', contactValidatorChanges, changeContactController)

module.exports = router
