const express = require('express')
const { ctrlWrapper } = require("../../helpers")
const contactsController = require('../../controllers/contactsController')

const router = express.Router()
router.patch('/:contactId/favorite', ctrlWrapper(contactsController.updateFavoriteById))

router.get('/', ctrlWrapper(contactsController.getAll))

router.get('/:contactId', ctrlWrapper(contactsController.getById))

router.post('/', ctrlWrapper(contactsController.addContact))

router.delete('/:contactId', ctrlWrapper(contactsController.deleteById))

router.put('/:contactId', ctrlWrapper(contactsController.updateById))

module.exports = router
