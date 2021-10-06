const express = require('express')
const router = express.Router()
const { controllerWrapper, validation } = require('../../middlewares')
const { put, post } = require('../../models/contact')

const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(post), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeById))

router.put('/:contactId', validation(put), controllerWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', validation(put), controllerWrapper(ctrl.updateContact))

module.exports = router
