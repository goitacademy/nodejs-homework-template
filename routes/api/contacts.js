const express = require("express");
const ctrl = require("../../controllers/contacts");
const contactsRouter = express.Router();
const { ctrlWrapper } = require("../../helpers");

contactsRouter.get("/", ctrlWrapper(ctrl.getAll));

contactsRouter.get("/:contactId", ctrlWrapper(ctrl.getByIdContact));

contactsRouter.post("/", ctrlWrapper(ctrl.addNewContact));

contactsRouter.put("/:contactId", ctrlWrapper(ctrl.updateByIdContact));

contactsRouter.delete("/:contactId", ctrlWrapper(ctrl.removeByIdContact));

module.exports = contactsRouter;
