const express = require("express");

const ctrl = require("../../controllers/feedback");

// const {
//   validateContact,
//   isValidId,
//   autenticate,
// } = require("../../middlewares");
// const schemas = require("../../schemas/schemContact");

const router = express.Router();

// router.get("/", autenticate, ctrl.getAllFeedback);
router.get("/", ctrl.getAllFeedback);

// router.get("/:contactId", autenticate, isValidId, ctrl.getContactById);

// router.post(
//   "/",
//   autenticate,
//   validateContact(schemas.contactSchema),
//   ctrl.addContact
// );
router.post(
  "/",
  ctrl.addFeedback
);

// router.delete("/:contactId", autenticate, isValidId, ctrl.deleteContactById);
router.delete("/:contactId", ctrl.deleteFeedbackById);

// router.patch(
//   "/:contactId/favorite",
//   autenticate,
//   validateContact(schemas.favoriteSchem),
//   isValidId,
//   ctrl.updatedFavorite
// );

// router.put(
//   "/:contactId",
//   autenticate,
//   isValidId,
//   validateContact(schemas.contactSchema),
//   ctrl.changeContact
// );

module.exports = router;
