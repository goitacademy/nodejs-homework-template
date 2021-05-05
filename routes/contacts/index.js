const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {
  validateQueryContact,
  validateAddContact,
  validateUpdateStatusContact,
  validateUpdateContact,
  validateObjectId
} = require('../contacts/valid-contact-router')
const guard = require('../../helpers/guard')

router
  .get('/', guard, validateQueryContact, ctrl.getAll)
  .post('/', validateAddContact, guard, ctrl.add)

router
.get('/:contactId', guard, validateObjectId, ctrl.getById)
.put('/:contactId', guard, validateUpdateContact, ctrl.update)
.patch('/:contactId/favorite', guard, validateUpdateStatusContact, ctrl.updateStatus)
.delete('/:contactId', guard, validateObjectId, ctrl.remove)

module.exports = router
