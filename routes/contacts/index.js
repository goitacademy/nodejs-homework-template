const express = require('express')
const router = express.Router()
const ctrl = require ('../../controllers/contacts')
const {
  validatorAddContact, 
  validatorUpdateContact,
  validatorObjectId,
} = require('./valid-contacts-router')
const handleError = require('../../helper/handle-error')

router.get('/', ctrl.listContacts).post('/', validatorAddContact, handleError(ctrl.addContact))

router
  .get('/:id', validatorObjectId, ctrl.getContactById)
  .delete('/:id', validatorObjectId, ctrl.removeContact)
  .put('/:id', validatorUpdateContact, ctrl.updateContact)
  .patch('/:id/', validatorUpdateContact, ctrl.updateContactStatus)

module.exports = router
