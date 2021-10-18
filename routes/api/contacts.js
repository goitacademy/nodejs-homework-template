const express = require('express')
const router = express.Router()

const { controllerWrapper, validation, authenticate, } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')

const { contact: ctrl } = require('../../controllers')

router.get('/', authenticate, controllerWrapper(ctrl.getContacts))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getById))

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.addContact))

router.patch(
  '/:contactId/favorite', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateById))

router.delete('/:contactId', controllerWrapper(ctrl.deleteById))

module.exports = router
