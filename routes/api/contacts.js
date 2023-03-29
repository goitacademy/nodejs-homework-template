const express = require("express");

const router = express.Router();

const {
  validateContactId,
  validateContactBody,
  validateFavorite,
} = require("../../middlewares/contactsMiddlewares");

const checkAuthMiddleware = require("../../middlewares/checkAuthMiddleware");

const {
  getListContactsController,
  getByIdController,
  addContactController,
  removeContactController,
  putContactController,
  updateStatusContact,
} = require("../../controllers/contactController");

router
  .route("/")
  .get(getListContactsController)
  .post(validateContactBody, addContactController);

router
  .route("/:contactId")
  .get(getByIdController)
  .put(validateContactBody, validateContactId, putContactController)
  .delete(validateContactId, removeContactController);

router
  .route("/:contactId/favorite")
  .patch(validateContactId, validateFavorite, updateStatusContact);

module.exports = router;
