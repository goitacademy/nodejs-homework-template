const express = require('express')
const router = express.Router()
const {
    getAllContacts,
    getContactById,
    addContact,
    deleteContact,
    updateStatusContact,
    updateContact,
} = require('../../controllers/contacts')
const { validationAddContact, validationUpdateContact, validationObjectId, validateUpdateContactFav } = require('./validationContacts')
const guard = require('../../helpers/guard')

router
  .get('/', guard, getAllContacts)
  .post('/', guard, validationAddContact, addContact)

router
  .get('/:contactId', guard, validationObjectId, getContactById)
  .delete('/:contactId', guard, validationObjectId, deleteContact)
  .put('/:contactId', guard, validationUpdateContact, validationObjectId, updateContact)

router
  .patch('/:contactId/favorite', guard, validateUpdateContactFav, validationObjectId, updateStatusContact)

module.exports = router
