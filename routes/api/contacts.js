// created by Irina Shushkevych
const express = require('express')
const {
  listContacts,
  getContactById,
  addContact,
  updateAllContact,
  removeContact,
  updateContact,
} = require('../../controllers/contacts')
const { postPutValidate, patchValidate } = require('../../middlewares')

const router = express.Router()

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', postPutValidate, addContact)

router.put('/:contactId', postPutValidate, updateAllContact)

router.patch('/:contactId', patchValidate, updateContact)

router.delete('/:contactId', removeContact)

module.exports = router
