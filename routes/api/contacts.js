const express = require('express')

const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contact')
const { controllerWrapper, validation } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')
console.log(ctrl)

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateContact))

router.patch('/:contactId', validation(updateFavoriteJoiSchema), controllerWrapper(ctrl.updateFavoriteContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

module.exports = router
