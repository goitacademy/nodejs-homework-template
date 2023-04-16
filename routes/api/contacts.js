const express = require('express')

const router = express.Router()

const {listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact}= require('../../controllers')
const {asyncFuncCatch, validationAddContact, validationUpdContact, validationUpdStatusContact} = require('../../middlewares')

router.get('/', asyncFuncCatch(listContacts))
router.get('/:contactId', asyncFuncCatch(getContactById))
router.post('/', validationAddContact, asyncFuncCatch(addContact))
router.delete('/:contactId', asyncFuncCatch(removeContact))
router.put('/:contactId', validationUpdContact, asyncFuncCatch(updateContact))
router.patch('/:contactId/favorite', validationUpdStatusContact, asyncFuncCatch(updateStatusContact))

module.exports = router
