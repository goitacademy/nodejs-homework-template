const express = require('express')

const { contacts: ctrl } = require('../../controllers')
const { ctrlWrapper, validation, auth } = require('../../middlewars')
const { joiContactSchema, joiStatusSchema } = require('../../models')

const router = express.Router()

router.get('/', auth, ctrlWrapper(ctrl.getAllContacts))

router.get('/:contactId', auth, ctrlWrapper(ctrl.getContactById))

router.post(
	'/',
	auth,
	validation(joiContactSchema),
	ctrlWrapper(ctrl.addContact)
)

router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeContact))

router.put(
	'/:contactId',
	auth,
	validation(joiContactSchema),
	ctrlWrapper(ctrl.updateContact)
)

router.patch(
	'/:contactId/favorite',
	auth,
	validation(joiStatusSchema),
	ctrlWrapper(ctrl.updateContactStatus)
)
module.exports = router
