const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateFavoriteController,
} = require("../../controller");
const validateId = require("../../validation/middlewares/validationIdMiddleware");
const validateRequestBody = require("../../validation/middlewares/validationRequestMiddleware");
const {
  validationAddContact,
  validationUpdateContact,
  validationUpdateFavorite,
} = require("../../validation/createContactValidation");

const router = express.Router();

router.get("/", getContactsController);

router.get("/:contactId", validateId, getContactByIdController);

router.post(
  "/",
  validateRequestBody(validationAddContact),
  addContactController
);

router.delete("/:contactId", validateId, deleteContactController);

router.put(
  "/:contactId",
  validateId,
  validateRequestBody(validationUpdateContact),
  updateContactController
);

router.patch(
  "/:contactId/favorite",
  validateId,
  validateRequestBody(validationUpdateFavorite),
  updateFavoriteController
);

module.exports = router;
