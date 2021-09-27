/* eslint-disable new-cap */
/* eslint-disable indent */
/* eslint-disable eol-last */
const express = require('express')

const { controllerWrapper, validation } = require('../../middlewares')
const { productSchema } = require('../../schemas')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(productSchema), controllerWrapper(ctrl.addContact))

router.put('/:contactId', validation(productSchema), controllerWrapper(ctrl.updateContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

module.exports = router