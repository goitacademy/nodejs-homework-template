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

const router = express.Router();

router.get("/", getContactsController);

router.get("/:contactId", validateId, getContactByIdController);

router.post("/", validateRequestBody, addContactController);

router.delete("/:contactId", validateId, deleteContactController);

router.put(
  "/:contactId",
  validateId,
  validateRequestBody,
  updateContactController
);

router.patch(
  "/:contactId/favorite",
  validateId,
  validateRequestBody,
  updateFavoriteController
);

module.exports = router;
