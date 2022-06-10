const express = require('express')
const router = express.Router()

const { contactsController } = require('../../../controller')
const guard = require('./../../../helpers/guard')
const {
  validationAddContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('./validate')

router
  .get('/', guard, contactsController.getAll)
  .get('/:contactId', guard, contactsController.getById)
  .post('/', [guard, validationAddContact], contactsController.add)
  .delete('/:contactId', guard, contactsController.remove)
  .patch(
    '/:contactId',
    [guard, validationUpdateContact],
    contactsController.update,
  )
  .patch(
    '/:contactId/favorite',
    [guard, validationUpdateStatusContact],
    contactsController.updateStatus,
  )
module.exports = router