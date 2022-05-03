const express = require('express')
const { ctrlWrapper, validation } = require('../../middlewars')
const { joiContactSchema, joiStatusSchema } = require('../../middlewars')
const {
	getAllContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
	updateContactStatus,
} = require('../../controllers')

const router = express.Router()

router.get('/', ctrlWrapper(getAllContacts))

router.get('/:contactId', ctrlWrapper(getContactById))

router.post('/', validation(joiContactSchema), ctrlWrapper(addContact))

router.delete('/:contactId', ctrlWrapper(removeContact))

router.put(
	'/:contactId',
	validation(joiContactSchema),
	ctrlWrapper(updateContact)
)

router.patch(
	'/:contactId/favorite',
	validation(joiStatusSchema),
	ctrlWrapper(updateContactStatus)
)
module.exports = router
