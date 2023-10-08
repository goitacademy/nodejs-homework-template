const express = require("express");

const { ctrlContacts } = require("../../../controllers");

const {
  validateBody,
  isValidId,
  authenticate,
} = require("../../../middleware");

const { schemas } = require("../../../models");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, ctrlContacts.getAll);

contactsRouter.get(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlContacts.getById
);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema, "Missing required name field"),
  ctrlContacts.add
);

contactsRouter.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlContacts.removeById
);

contactsRouter.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema, "Missing fields"),
  ctrlContacts.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "Missing field favorite"),
  ctrlContacts.updateFavoriteById
);

module.exports = contactsRouter;
