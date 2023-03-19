const express = require("express");
const ContactsController = require("../../controllers/contactsController");
const auth = require('../../middlewares/auth')
const { joiSchema,favoriteSchema } = require("../../models/contacts");
const { validateBody } = require("../../middlewares/validation");

const ContactsRouter = express.Router();

ContactsRouter.get("/", auth, ContactsController.listContacts);

ContactsRouter.get("/:contactId", ContactsController.getContactById);

ContactsRouter.post("/", auth, validateBody(joiSchema), ContactsController.addContact);

ContactsRouter.put("/:contactId", validateBody(joiSchema), ContactsController.updateContact);

ContactsRouter.patch("/:contactId/favorite", validateBody(favoriteSchema), ContactsController.patchContact);

ContactsRouter.delete("/:contactId", ContactsController.removeContact);

module.exports = ContactsRouter;
