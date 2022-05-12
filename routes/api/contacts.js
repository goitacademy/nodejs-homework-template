const express = require('express')
const { ctrlWrapper, validation } = require('../../middlewars')
const { joiContactSchema, joiStatusSchema } = require('../../middlewars')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAllContacts))

router.get('/:contactId', ctrlWrapper(ctrl.getContactById))

router.post('/', validation(joiContactSchema), ctrlWrapper(ctrl.addContact))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

router.put(
	'/:contactId',
	validation(joiContactSchema),
	ctrlWrapper(ctrl.updateContact)
)

router.patch(
	'/:contactId/favorite',
	validation(joiStatusSchema),
	ctrlWrapper(ctrl.updateContactStatus)
)
module.exports = router
