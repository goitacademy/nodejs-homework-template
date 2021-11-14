const express = require('express')

const { contacts: ctrl } = require('../../controllers')
const { validation, controllerWrapper } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', controllerWrapper(ctrl.updateStatusContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))
module.exports = router
