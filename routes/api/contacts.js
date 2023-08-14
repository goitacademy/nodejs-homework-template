const express = require('express')

const contactsController = require("../../controllers/contacts-controller");

const schemas = require("../../schemas/contacts");

const { validateBody } = require("../../decorators");

const router = express.Router()


router.get("/",contactsController.getAllContacts)

router.get("/:contactId", contactsController.getContactById)

router.post("/", validateBody(schemas.contactsAddSchema),
contactsController.addContact)

router.put("/:contactId", validateBody(schemas.contactsAddSchema),
contactsController.updateContactById)

router.delete("/:contactId", contactsController.deleteContact)


module.exports = router
