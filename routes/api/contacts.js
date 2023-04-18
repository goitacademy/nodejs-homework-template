const express = require('express')
const { validatePostData, validatePutData } = require('../../validation/validation')
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../controllers/controllers')

const router = express.Router()

router.get('/', listContacts)

router.get('/:id', getContactById)

router.delete('/:id', removeContact)

router.post('/', addContact, validatePostData)

router.put('/:id', updateContact, validatePutData)

module.exports = router
