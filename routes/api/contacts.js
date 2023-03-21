const express = require("express");

const router = express.Router();

const {
  validateContactId,
  validateContactBody,
  validateFavorite,
} = require("../../middlewares/contactsMiddlewares");

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
  .patch(
    validateContactId,
    validateFavorite,
    validateContactBody,
    updateStatusContact
  );

// router.get("/", getListContactsController);
// router.post("/", validateContactBody, addContactController);
// router.get("/:contactId", getByIdController);
// router.put(
//   "/:contactId",
//   validateContactBody,
//   validateContactId,
//   putContactController
// );
// router.delete("/:contactId", validateContactId, removeContactController);

module.exports = router;
