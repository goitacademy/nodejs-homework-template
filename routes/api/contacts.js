const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts')
const { contactValidator } = require('./../../utils/validators/validator')

const router = express.Router()

/**OBTAINING LIST OF CONTACTS */
router.get('/', async (req, res, next) => {
	const contacts = await listContacts()
	console.log('GET /', contacts)
	res.status(200).json(contacts)
})

/**GETTING CONTACT BY ID */
router.get('/:contactId', async (req, res, next) => {
	const { contactId } = req.params
	const contact = await getContactById(contactId)
	if (contact) {
		res.status(200).json(contact)
	} else {
		res.status(404).json({ message: 'Not found' })
	}
})

/**ADDING NEW CONTACT TO THE LIST */
router.post('/', async (req, res, next) => {
	const { error } = contactValidator(req.body)
	if (error) return res.status(400).json({ message: error.details[0].message })
	const contact = await addContact(req.body)
	if (contact) {
		res.status(200).json(contact)
	} else {
		res.status(400).json({ message: 'missing required name field' })
	}
})

/**DELETING A CONTACT BY ID */
router.delete('/:contactId', async (req, res, next) => {
	const { contactId } = req.params
	const contact = await removeContact(contactId)
	if (contact) {
		res.status(200).json({ message: 'contact deleted' })
	} else {
		res.status(404).json({ message: 'Not found' })
	}
})

/**UPDATING A CONTACT BY ID */
router.put('/:contactId', async (req, res, next) => {
	const { error } = contactValidator(req.body)
	if (error) return res.status(400).json({ message: error.details[0].message })
	const { name, email, phone } = req.body
	const { contactId } = req.params
	if (!name && !email && !phone) {
		res.status(400).json({ message: 'missing fields' })
	}
	const contact = await updateContact(contactId, req.body)
	if (contact) {
		res.status(200).json(contact)
	} else {
		res.status(404).json({ message: 'Not found' })
	}
})

module.exports = router
