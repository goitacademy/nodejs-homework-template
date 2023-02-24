const express = require('express')

const { isValidId } = require("../../middlewares")
const { ctrlWrapper } = require("../../helpers")
const { getAllContacts, getContactById, addContact, removeContact, updateContact, updateContactFavorite } = require("../../controllers/contacts")

const router = express.Router()

router.get('/', ctrlWrapper(getAllContacts))

router.get('/:id', isValidId, ctrlWrapper(getContactById))

router.post('/', ctrlWrapper(addContact))

router.delete('/:id', isValidId, ctrlWrapper(removeContact))

router.put('/:id', isValidId, ctrlWrapper(updateContact))

router.patch('/:id/favorite', isValidId, ctrlWrapper(updateContactFavorite))

module.exports = router
