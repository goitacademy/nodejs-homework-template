const express = require("express");

const contactsRouter = express.Router();

const { contactsController } = require("../../controllers");

const { contactComesSchema, updateFavoriteSchema } = require("../../schemas");

const { isValidId, validateBody, authenticate } = require("../../middlewares");

contactsRouter.get("/", authenticate, contactsController.listContacts);

contactsRouter.get(
  "/:id",
  authenticate,
  isValidId,
  contactsController.getContactById
);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(contactComesSchema),
  contactsController.addContact
);

contactsRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  contactsController.removeContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(contactComesSchema),
  contactsController.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  contactsController.updateStatusContact
);

module.exports = contactsRouter;
