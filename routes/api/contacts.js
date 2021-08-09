const express = require('express')

const { validateContatct } = require('../middlewares')
const { contacts: ctrl } = require('../controllers')

const router = express.Router()

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', validateContatct, ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', validateContatct, ctrl.updateContact)

module.exports = {
  router
}
