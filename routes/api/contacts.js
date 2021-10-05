const express = require('express')

const { controllerWrapper } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')
console.log(ctrl)

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', controllerWrapper(ctrl.addContact))

router.put('/:contactId', controllerWrapper(ctrl.updateContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

module.exports = router
