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
const { addContactSchema, updateStatusSchema } = require("../../schemas/schemas")
const { auth } = require("../../middlewares/validation")



const contactsRouter = express.Router();

contactsRouter.get("/", auth, getContacts);

contactsRouter.get("/:contactId", auth, getContact);

contactsRouter.post("/", auth, validateBody(addContactSchema), createContact);

contactsRouter.delete("/:contactId", auth,  deleteContact);

contactsRouter.put("/:contactId", auth, validateBody(addContactSchema), changeContact);

contactsRouter.patch("/:contactId/favorite", auth, validateBody(updateStatusSchema), updateStatusContact)

module.exports = contactsRouter;
 