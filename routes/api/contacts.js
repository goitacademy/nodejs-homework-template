const express = require('express')
const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts')
const {checkUserById} = require('../../middlewares/contactMiddlewares')

const router = express.Router()

router.get('/', listContacts)
router.get('/:contactId', checkUserById, getContactById)
router.post('/', addContact)
router.delete('/:contactId', checkUserById, removeContact)
router.put('/:contactId', checkUserById, updateContact)

module.exports = router
