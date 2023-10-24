const express = require("express");

const { isEmptyBody, isValidId, authenticate } = require("../../middlewares");

const contactsController = require("../../controllers/contacts");

const { validateBody } = require("../../decorators");

const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("../../models/Contact");

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const contactRouter = express.Router();

contactRouter.use(authenticate);

contactRouter.get("/", contactsController.getAll);

contactRouter.get("/:contactId", isValidId, contactsController.getById);

contactRouter.post(
  "/",
  isEmptyBody,
  contactAddValidate,
  contactsController.add
);

contactRouter.delete("/:contactId", isValidId, contactsController.deleteById);

contactRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  contactAddValidate,
  contactsController.updateById
);

contactRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  contactUpdateFavoriteValidate,
  contactsController.updateStatusContact
);

module.exports = contactRouter;
