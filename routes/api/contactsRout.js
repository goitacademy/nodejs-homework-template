const express = require('express')
const router = express.Router()

const { addContactValidation, putContactValidation } = require('../../middlewares/validationMiddlewares')
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../controllers/contactsControllers')

router.get('/', listContacts)

router.get('/:id', getContactById)

router.post('/', addContactValidation, addContact)

router.delete('/:id', removeContact)

router.put('/:id', putContactValidation, updateContact)


module.exports = { contactsRouter: router }
