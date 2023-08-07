const express = require("express");

const {
  getAllContacts,
  getContactById,
  addContact,
  ubdateContactById,
  ubdateFavourite,
  deleteContactById,
} = require("../../controllers/contacts");

const { checkID, validateBody, authenticate } = require("../../middlewares");

const { validateSchema, ubdateFavouriteSchema } = require("../../models/contact");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:contactId", authenticate, checkID, getContactById);

contactsRouter.post("/", authenticate, validateBody(validateSchema), addContact);

contactsRouter.put("/:contactId", validateBody(validateSchema), checkID, ubdateContactById);

contactsRouter.patch(
  "/:contactId/favourite",
  authenticate,
  validateBody(ubdateFavouriteSchema),
  checkID,
  ubdateFavourite
);

contactsRouter.delete("/:contactId", authenticate, checkID, deleteContactById);

module.exports = contactsRouter;
