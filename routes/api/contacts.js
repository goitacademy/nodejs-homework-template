const express = require('express')
const {schemaCreateContact, schemaMongoId, schemaFavoriteContact} = require('../validation')
const {validation, validationParams, validationFavorite} = require('../../middlewares/validation')
const router = express.Router()
const {listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact}  = require('../../controllers/index')

router.get('/', listContacts )

router.get('/:contactId', validationParams(schemaMongoId), getContactById)

router.post('/', validation(schemaCreateContact), addContact)

router.delete('/:contactId', validationParams(schemaMongoId), removeContact)

router.put('/:contactId', validationParams(schemaMongoId), validation(schemaCreateContact), updateContact)

router.patch('/:contactId/favorite', validationParams(schemaMongoId), validationFavorite(schemaFavoriteContact), updateStatusContact)

module.exports = router
