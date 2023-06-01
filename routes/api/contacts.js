const express = require('express')

const contactsController = require('../../controllers/contacts-controller')
const schemas = require('../../schemas/contactsSchemas')

const {validateBody} = require("../../decorators")
const router = express.Router();

router.get('/', contactsController.getAllContacts)

router.get('/:id', contactsController.getContactById)

router.post('/', validateBody(schemas.contactAddSchema), contactsController.addContact)

router.put('/:id', validateBody(schemas.contactAddSchema), contactsController.updateContactById )


router.delete('/:id', contactsController.deleteContactById )



module.exports = router
