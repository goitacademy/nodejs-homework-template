const express = require('express')
const router = express.Router()

const { contacts: ctrl } = require('../../controllers/index')
const { validation, controllerWrapper } = require('../../middlewars')
const { joiShema, patchShema } = require('../../models/contact')

router.get('/', controllerWrapper(ctrl.getAllContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiShema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.put('/:contactId', validation(joiShema), controllerWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', validation(patchShema), controllerWrapper(ctrl.updateStatusContact))

module.exports = router
