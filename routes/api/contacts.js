const express = require("express");

const ctrl = require("../../controllers/contacts");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:contactId", ctrl.getByIdContact);

contactsRouter.post("/", ctrl.addNewContact);

contactsRouter.put("/:contactId", ctrl.updateByIdContact);

contactsRouter.delete("/:contactId", ctrl.removeByIdContact);

module.exports = contactsRouter;
