const express = require("express");
const contactsRouter = express.Router();
const contactsCtrl = require("../../controllers/contacts");

contactsRouter.get("/", contactsCtrl.getAllContacts);

contactsRouter.get("/:id", contactsCtrl.getContactById);

contactsRouter.post("/", contactsCtrl.addContact);

contactsRouter.put("/:id", contactsCtrl.updateContact);

contactsRouter.delete("/:id", contactsCtrl.deleteContact);


module.exports = contactsRouter;
