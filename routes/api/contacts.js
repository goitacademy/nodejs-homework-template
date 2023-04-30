const express = require("express");

const router = express.Router();

const contactsController = require("../../controllers/contacts-controllers")

const {validateBody} = require("../../utils")

const {isValidId, authenticate} = require("../../middlewares")

const schema = require("../../schema/contacts")

router.use(authenticate)

router.get("/", contactsController.getAllContacts);

router.get("/:id", isValidId, contactsController.getContactById);

router.post("/", validateBody(schema.contactsAddSchema), contactsController.addContact);

router.delete("/:id", isValidId, contactsController.deleteContact);

router.put("/:id", isValidId, validateBody(schema.contactsPutSchema), contactsController.updateContact);

router.patch("/:id/favorite", isValidId, validateBody(schema.contactUpdateFavoriteSchema), contactsController.updateFavorite)

module.exports = router;
