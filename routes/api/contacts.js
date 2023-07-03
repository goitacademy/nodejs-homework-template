const express = require('express')
const { getAll, getById, addNewContact,removeContactById, updateOldContact} = require('../../controllers/contacts')

const router = express.Router()

router.get('/', getAll)

router.get('/:contactId', getById)

router.post('/', addNewContact)

router.delete('/:contactId',  removeContactById)

router.put('/:contactId', updateOldContact)

module.exports = router
