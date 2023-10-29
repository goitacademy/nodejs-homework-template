const express = require("express");

const router = express.Router();

const { isEmptyBody, isValidId } = require("../../middlewares");

const { validateBody } = require("../../decorators");

const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("../../models");

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateFavoriteContactController,
} = require("../../controllers");

router.get("/", listContactsController);

router.get("/:contactId", isValidId, getContactByIdController);

router.post("/", isEmptyBody, contactAddValidate, addContactController);

router.delete("/:contactId", isValidId, removeContactController);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  contactAddValidate,
  updateContactController
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  contactUpdateFavoriteValidate,
  updateFavoriteContactController
);

module.exports = { router };
