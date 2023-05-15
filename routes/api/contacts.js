const express = require("express");
const contactsController= require("../../controllers/contact-controller.js")
const router = express.Router();
const validateBody= require('../../decorators/validateBody.js')
const schema = require('../../schema/contactsSchema.js')


router.get("/", contactsController.getAllContacts);

router.get("/:id",contactsController.getContactByIdb );

router.post("/", validateBody(schema.contactSchema), contactsController.addContact );

router.put("/:id",validateBody(schema.contactSchema), contactsController.updateContact);

router.delete("/:id", contactsController.removeContact );
module.exports = router;
