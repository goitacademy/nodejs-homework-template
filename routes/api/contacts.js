const express = require("express");
const contactsController= require("../../controllers/contact-controller.js")
const router = express.Router();
const {validateBody, isValidId}= require('../../decorators')
const schema = require('../../schema/contactsSchema.js');



router.get("/", contactsController.getAllContacts);

router.get("/:id", isValidId, contactsController.getContactByIdb );

router.post("/", validateBody(schema.contactSchema), contactsController.addContact );

router.put("/:id", isValidId, validateBody(schema.contactSchema), contactsController.updateContact);

router.delete("/:id", isValidId, contactsController.removeContact );

router.patch("/:id/favorite", isValidId, validateBody(schema.updateFavoriteSchema), contactsController.updateFavorite);

module.exports = router;
