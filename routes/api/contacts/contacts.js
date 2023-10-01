const express = require("express");

const { ctrlContacts } = require("../../../controllers");

const { validateBody, isValidId } = require("../../../middleware");

const { schemas } = require("../../../models");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlContacts.getAll);

contactsRouter.get("/:contactId", isValidId, ctrlContacts.getById);

contactsRouter.post(
  "/",
  validateBody(schemas.addSchema, "Missing required name field"),
  ctrlContacts.add
);

contactsRouter.delete("/:contactId", isValidId, ctrlContacts.removeById);

contactsRouter.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema, "Missing fields"),
  ctrlContacts.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "Missing field favorite"),
  ctrlContacts.updateFavoriteById
);

module.exports = contactsRouter;
