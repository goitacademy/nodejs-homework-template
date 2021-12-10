const express = require('express')

const { auth, validation, ctrlWrapper } = require('../../middlewares')
const { joiSchema, statusJoiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', auth, ctrlWrapper(ctrl.listContacts))

router.get('/:id', ctrlWrapper(ctrl.getContactById))

router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.addContact))

router.put('/:id', validation(joiSchema), ctrlWrapper(ctrl.updateContactById))

router.patch('/:id/favorite', validation(statusJoiSchema), ctrlWrapper(ctrl.updateStatusContact))

router.delete('/:id', ctrlWrapper(ctrl.removeContact))

module.exports = router
