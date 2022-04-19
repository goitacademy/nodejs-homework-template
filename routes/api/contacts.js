const express = require('express')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models')

const {  
    addContactValidation
} = require('../../middlewares/validationMiddlewares')

const router = express.Router()

router.get('/', listContacts)
router.get('/:contactId', getContactById)
router.post('/', addContactValidation, addContact)
router.put('/:contactId', addContactValidation, updateContact)
router.delete('/:contactId', removeContact)

module.exports = router
