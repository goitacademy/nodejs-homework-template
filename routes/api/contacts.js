const express = require('express')

const { validation } = require("../../middlewares")
const { addContactsSchema, updateContactsSchema } = require("../../schemas");
const { controllers } = require('../../controllers')

const router = express.Router()

router.get("/", controllers.listContacts)

router.get('/:id', controllers.getContactById)

router.post('/', validation(addContactsSchema), controllers.addContact)

router.delete('/:id', controllers.removeContact)

router.put('/:id', validation(updateContactsSchema), controllers.updateContact)

module.exports = router
