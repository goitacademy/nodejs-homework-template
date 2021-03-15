const express = require('express')
const router = express.Router()
const validate = require('./validation')
const contactsController = require('../../../controllers/controllers-contacts')
const guard = require('../../../helpers/guard')


router
  .get('/', guard, contactsController.getAllContacts)
  .post('/', guard, validate.createContact, contactsController.createContact)

router
  .get('/:contactId', guard, contactsController.getContactById)
  .delete('/:contactId', guard, contactsController.deleteContact)
  .patch('/:contactId', guard, validate.updateContact, contactsController.patchContact)

module.exports = router




