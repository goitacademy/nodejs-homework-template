/* eslint-disable new-cap */
/* eslint-disable indent */
/* eslint-disable eol-last */
const express = require('express')
const router = express.Router()

const { controllerWrapper, validation } = require('../../middlewares')
const { productSchema } = require('../../schemas')
const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validate(productSchema), controllerWrapper(ctrl.addContact))

router.put('/:contactId', controllerWrapper(ctrl.updateContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

module.exports = router