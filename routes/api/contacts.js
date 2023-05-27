const express = require("express");
const { contacts: contactsCtrl } = require("../../controllers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, contactsCtrl.getContactsList);

contactsRouter.get("/:contactId", authenticate, isValidId, contactsCtrl.getContactById);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  contactsCtrl.addContact
);

contactsRouter.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  contactsCtrl.updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  contactsCtrl.updateContactStatus
);

contactsRouter.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsCtrl.deleteContact
);

module.exports = contactsRouter;
