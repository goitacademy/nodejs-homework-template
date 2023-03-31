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
  .get(checkAuthMiddleware, getListContactsController)
  .post(checkAuthMiddleware, validateContactBody, addContactController);

router
  .route("/:contactId")
  .get(checkAuthMiddleware, getByIdController)
  .put(
    checkAuthMiddleware,
    validateContactBody,
    validateContactId,
    putContactController
  )
  .delete(checkAuthMiddleware, validateContactId, removeContactController);

router
  .route("/:contactId/favorite")
  .patch(
    checkAuthMiddleware,
    validateContactId,
    validateFavorite,
    updateStatusContact
  );

module.exports = router;
