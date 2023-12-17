const express = require('express')
const router = express.Router()
// const Contacts = require('./../../model/contacts');
const contactsController = require('./../../controllers/contacts')
const validate = require('./validation');

router
  .get('/', contactsController.get)
  .post('/', validate.createContact, contactsController.create)

router.get('/:id', contactsController.getById)
    .delete('/:id', contactsController.remove)
    .put('/:id', validate.updateContact, contactsController.update)


module.exports = router
