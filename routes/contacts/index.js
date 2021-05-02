const express = require('express')
const router = express.Router()
const ctrl = require ('../../controllers/contacts')
const {
  validatorAddContact, 
  validatorUpdateContact,
  validatorObjectId,
} = require('./valid-contacts-router')
const handleError = require('../../helper/handle-error')
const guard = require('../../helper/guard')

router.get('/', guard, ctrl.listContacts).post('/', guard, validatorAddContact, handleError(ctrl.addContact))

router
  .get('/:id', guard, validatorObjectId, ctrl.getContactById)
  .delete('/:id', guard, validatorObjectId, ctrl.removeContact)
  .put('/:id', guard, validatorUpdateContact, ctrl.updateContact)
  .patch('/:id/', guard, validatorUpdateContact, ctrl.updateContactStatus)

module.exports = router
