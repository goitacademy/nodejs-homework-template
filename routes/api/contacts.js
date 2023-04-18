const express = require("express");

const router = express.Router();

const contactsController = require("../../controllers/contacts-controllers")

const {validateBody} = require("../../utils")

const {isValidId} = require("../../middlewares")

const schema = require("../../schema/contacts")

router.get("/", contactsController.getAllContacts);

router.get("/:id", isValidId, contactsController.getContactById);

router.post("/", validateBody(schema.contactsAddSchema), contactsController.addContact);

router.delete("/:id", contactsController.deleteContact);

router.put("/:id", validateBody(schema.contactsPutSchema), contactsController.updateContact);

router.patch("/:id/favorite", isValidId, validateBody(schema.contactUpdateFavoriteSchema), contactsController.updateFavorite)

module.exports = router;
