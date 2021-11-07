const express = require('express')

const getContacts = require('../../controllers/contacts/getContacts')
const getContactById = require('../../controllers/contacts/getContactById')
const postContact = require('../../controllers/contacts/postContact')
const deleteContact = require('../../controllers/contacts/deleteContact')
const putContact = require('../../controllers/contacts/putContact')

const router = express.Router()

router.get('/', getContacts)

router.get('/:id', getContactById)

router.post('/', postContact)

router.delete('/:id', deleteContact)

router.put('/:id', putContact)

module.exports = router
