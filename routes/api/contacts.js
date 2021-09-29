const express = require('express')

const { contacts: ctrl } = require('../../controllers')

const { controllerWrapper } = require('../../middleware')
// const joiSchema = require('../../models/contact')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

// router.get('/:contactId', controllerWrapper(ctrl.getContactById))

// router.post('/', validation(contactSchema), controllerWrapper(ctrl.addContact))

// router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

// router.put('/:contactId', validation(contactSchema), controllerWrapper(ctrl.updateById))

module.exports = router
