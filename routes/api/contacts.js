const express = require('express')
const path = require("path");
const router = express.Router()
const jsonParcer = express.json();
const contactsPath = path.join(__dirname, "../../controllers/contactsController.js");
const {
	getContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateFavoriteField
} = require(contactsPath)

router.get('/', getContacts)

router.get('/:id', getContactById)

router.post('/', jsonParcer, addContact)

router.delete('/:id', removeContact)

router.put("/:id", jsonParcer, updateContact)

router.patch('/:id/favorite', jsonParcer, updateFavoriteField)


module.exports = router
