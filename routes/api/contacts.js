const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../controllers')

const {
  validateCreateContact,
  validateUpdateContact,
} = require('../../validation/contacts')

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validateCreateContact, ctrl.add)

router.delete('/:contactId', ctrl.remove)

router.patch('/:contactId', validateUpdateContact, ctrl.update)

module.exports = router
