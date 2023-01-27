const express = require("express");
const {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  changeContact,
  updateStatusContact,
} = require("../../controllers/controllers");
const { validateBody } = require("../../middlewares/validation")
const {addContactSchema, updateStatusSchema} = require("../../schemas/schemas")


const contactsRouter = express.Router();

contactsRouter.get("/", getContacts);

contactsRouter.get("/:contactId", getContact);

contactsRouter.post("/", validateBody(addContactSchema), createContact);

contactsRouter.delete("/:contactId", deleteContact);

contactsRouter.put("/:contactId", validateBody(addContactSchema), changeContact);

contactsRouter.patch("/:contactId/favorite", validateBody(updateStatusSchema), updateStatusContact)

module.exports = contactsRouter;
 