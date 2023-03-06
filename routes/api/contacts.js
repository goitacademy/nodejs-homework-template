const express = require("express");

const contactsRouter = express.Router();

const { contactsController } = require("../../controllers");

const { isValidId } = require("../../middlewares");

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:id", isValidId, contactsController.getContactById);

contactsRouter.post("/", contactsController.addContact);

contactsRouter.delete("/:id", isValidId, contactsController.removeContact);

contactsRouter.put("/:id", isValidId, contactsController.updateContact);

contactsRouter.patch("/:id/favorite", isValidId, contactsController.updateStatusContact);

module.exports = contactsRouter;