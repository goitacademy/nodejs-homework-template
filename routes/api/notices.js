const express = require('express')
const router = express.Router()
const {listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact} = require('../../controllers/index')
const authenticate = require('../../middlewares/authMiddleware');

router.get('/', authenticate, listContacts)

router.get('/:id', authenticate, getContactById)

router.post('/', authenticate, addContact)

router.delete('/:id', authenticate, removeContact)

router.put('/:id', authenticate, updateContact)

router.put('/:id/favorite', authenticate, updateStatusContact)


module.exports = router