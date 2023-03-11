const express = require('express')
const { getContact, getContactId, getContactPost, getContactDelete, getContactPut } = require('../../controllers/contactsControlles')
const { addValidation } = require('../../middlewares/validationMiddlevares')


const router = express.Router()

router.get('/', getContact)

router.get('/:contactId', getContactId)

router.post('/', addValidation, getContactPost)

router.delete('/:contactId', getContactDelete)

router.put('/:contactId', addValidation, getContactPut)

module.exports = router

