const express = require('express')
const router = express.Router()

const validate = require('../api/validation.js')
const validateId = require('../api/validationId')
const contactController = require('../../controllers/index')

router.get('/', contactController.listContacts)

router.post('/', validate.createContact, contactController.addContact)

router.get('/:contactId', validateId, contactController.getContactById)

router.delete('/:contactId', validateId, contactController.removeContact)

router.patch(
  '/:contactId',
  validateId,
  validate.updateContact,
  contactController.updateContact
)

module.exports = router
