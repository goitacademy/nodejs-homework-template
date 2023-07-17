const express = require("express");

const contactsRouter = express.Router();

const contactController = require('../../controllers/contacts-controllers.js')

contactsRouter.get("/", contactController.getAll);

contactsRouter.get("/:contactId", contactController.getById);

contactsRouter.post("/",   contactController.createNewContact);

contactsRouter.delete("/:contactId", contactController.deleteById);

contactsRouter.put("/:contactId", contactController.updateContactById);

module.exports = contactsRouter;
