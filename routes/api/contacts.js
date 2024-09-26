const express = require('express')
const router = express.Router()
const {listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact} = require('../../controllers/contacts')


router.get('/', listContacts)

router.get('/:id', getContactById)

router.post('/', addContact)

router.delete('/:id', removeContact)

router.put('/:id', updateContact)

router.put('/:id/favorite', updateStatusContact)


module.exports = router