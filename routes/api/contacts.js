/* eslint-disable new-cap */
/* eslint-disable indent */
/* eslint-disable eol-last */
const express = require('express')

const { controllerWrapper, validation } = require('../../middlewares')
const { joiSchema, statusJoiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.patch('/:contactId/favorite', validation(statusJoiSchema), controllerWrapper(ctrl.updateStatusContact))

module.exports = router