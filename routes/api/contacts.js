const express = require('express')
const router = express.Router()
const {basedir} = global
const {auth} = require(`${basedir}/middlewares`)
const {getAll, getContact, createContact, removeContact, updateContact, updateFavoriteContact} = require(`${basedir}/controllers/contacts`)
const {validateContact, validateId, validateFavorite} = require('./validation')
const ctrlWrapper = require(`${basedir}/helpers/ctrlWrapper`)

router.get('/', auth, ctrlWrapper(getAll))

router.get('/:contactId', auth, validateId, ctrlWrapper(getContact))

router.post('/', auth, validateContact, ctrlWrapper(createContact))

router.delete('/:contactId', auth, validateId, ctrlWrapper(removeContact))

router.put('/:contactId', auth, validateId, validateContact, ctrlWrapper(updateContact))

router.patch('/:contactId/favorite', auth, validateId, validateFavorite, ctrlWrapper(updateFavoriteContact))

module.exports = router