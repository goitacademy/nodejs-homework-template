const express = require('express')

const { validation, ctrlWrapper } = require('../../middlewares')
const { contactSchema } = require('../../schemas')
const { contacts: ctrl } = require('../../controllers')

const validateMiddleware = validation(contactSchema)
const router = express.Router()

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:id', ctrlWrapper(ctrl.getContactById))

router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContact))

router.put('/:id', validation(contactSchema), ctrlWrapper(ctrl.updateContactById))

router.delete('/:id', ctrlWrapper(ctrl.removeContact))

module.exports = router
