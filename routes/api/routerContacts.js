const express = require('express')

const { ctrlWrapper } = require("../../helpers")
const { getAllContacts, getContactById, addContact, removeContact, updateContact } = require("../../controllers/contacts")

const router = express.Router()

router.get('/', ctrlWrapper(getAllContacts))

router.get('/:id', ctrlWrapper(getContactById))

router.post('/', ctrlWrapper(addContact))

router.delete('/:id', ctrlWrapper(removeContact))

router.put('/:id', ctrlWrapper(updateContact))

module.exports = router
