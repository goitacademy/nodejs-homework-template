const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateFavoriteController,
} = require("../../controller/contactsController");
const validateId = require("../../validation/middlewares/validationIdMiddleware");
const validateRequestBody = require("../../validation/middlewares/validationRequestMiddleware");
const {
  validationAddContact,
  validationUpdateContact,
  validationUpdateFavorite,
} = require("../../validation/createContactSchema");
const checkAuth = require("../../validation/middlewares/checkAuthMiddleware");

const router = express.Router();

router.get("/", checkAuth, getContactsController);

router.get("/:contactId", validateId, checkAuth, getContactByIdController);

router.post(
  "/",
  validateRequestBody(validationAddContact),
  checkAuth,
  addContactController
);

router.delete("/:contactId", validateId, checkAuth, deleteContactController);

router.put(
  "/:contactId",
  validateId,
  validateRequestBody(validationUpdateContact),
  checkAuth,
  updateContactController
);

router.patch(
  "/:contactId/favorite",
  validateId,
  validateRequestBody(validationUpdateFavorite),
  checkAuth,
  updateFavoriteController
);

module.exports = router;
