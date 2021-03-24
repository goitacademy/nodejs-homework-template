const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contacts')
const validate = require('../../service/validation')

router
  .get('/', contactsController.get)
  .post('/', validate.createContact, contactsController.post)

router
  .get('/:contactId', contactsController.getById)
  .delete('/:contactId', contactsController.remove)
  .patch('/:contactId', validate.updateContact, contactsController.update)

module.exports = router
