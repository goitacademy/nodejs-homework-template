const express = require('express')
const { validatePostData, validatePutData,  validatePatchData} = require('../../utils/validation')
const authenticate = require("../../utils/authenticate")
const { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact } = require('../../controllers/controllers')

const router = express.Router()

router.get('/', authenticate, listContacts)

router.get('/:id' ,authenticate, getContactById)

router.delete('/:id', authenticate, removeContact)

router.post('/', authenticate, validatePostData, addContact)

router.put('/:id', authenticate, validatePutData, updateContact)

// favorite
router.patch('/:id/favorite', authenticate, validatePatchData, updateStatusContact)

module.exports = router