const express = require('express')
const router = express.Router()
const {getAll, getContact, createContact, removeContact, updateContact, updateFavoriteContact} = require('../../controllers')
const {validateContact, validateId, validateFavorite} = require('./validation')
const ctrlWrapper = require('../../helpers/ctrlWrapper')

router.get('/', ctrlWrapper(getAll))

router.get('/:contactId', validateId, ctrlWrapper(getContact))

router.post('/', validateContact, ctrlWrapper(createContact))

router.delete('/:contactId', validateId, ctrlWrapper(removeContact))

router.put('/:contactId', validateId, validateContact, ctrlWrapper(updateContact))

router.patch('/:contactId/favorite', validateId, validateFavorite, ctrlWrapper(updateFavoriteContact))

module.exports = router