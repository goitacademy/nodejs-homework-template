const express = require("express");
const {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  changeContact,
} = require("../../controllers/controllers");
const { validateBody } = require("../../middlewares/validation")
const {addContactSchema} = require("../../schemas/schemas")


const contactsRouter = express.Router();

contactsRouter.get("/", getContacts);

contactsRouter.get("/:contactId", getContact);

contactsRouter.post("/", validateBody(addContactSchema), createContact);

contactsRouter.delete("/:contactId", deleteContact);

contactsRouter.put("/:contactId", validateBody(addContactSchema), changeContact);

module.exports = contactsRouter;
 