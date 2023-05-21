const express = require('express')
const { getContacts, getContact, deleteContact, createContact, refreshContact } = require('../../controllers/contactsControllers')

const { validateBody } = require('../../decorators/validateBody');
const {contactSchema} = require('../../schemas/contactSchema')

const router = express.Router()

router.route("/").get(getContacts).post(validateBody(contactSchema),createContact);
router.route("/:contactId").get(getContact).put(validateBody(contactSchema) ,refreshContact).delete(deleteContact);

module.exports = router
