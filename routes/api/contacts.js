const express = require('express')
const { validatePostData, validatePutData,  validatePatchData} = require('../../utils/validation')
const { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact } = require('../../controllers/controllers')

const router = express.Router()

router.get('/', listContacts)

router.get('/:id', getContactById)

router.delete('/:id', removeContact)

router.post('/', validatePostData, addContact)

router.put('/:id', validatePutData, updateContact)

router.patch('/:id/favorite', validatePatchData, updateStatusContact)

module.exports = router

