const express = require('express')
const router = express.Router()

const { addContactValidation, patchContactValidation } = require('../../middlewares/validationMiddlewares')
const { listContacts, getContactById, addContact, removeContact, updateContactFull,
    updateContactPartial } = require('../../controllers/contactsControllers')

router.get('/', listContacts)

router.get('/:id', getContactById)

router.post('/', addContactValidation, addContact)

router.delete('/:id', removeContact)

router.put('/:id', addContactValidation, updateContactFull)

router.patch('/:id', patchContactValidation, updateContactPartial)


module.exports = { contactsRouter: router }
