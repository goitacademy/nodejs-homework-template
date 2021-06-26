const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/users");
// const {
//   validationCreateContact,
//   validationUpdateContact,
//   validationUpdateFavorite,
//   validateMongoId,
// } = require("./validation");

// router.get("/", ctrl.listContacts);

// router.get("/:contactId", validateMongoId, ctrl.getContactById);

router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login);
router.post("/logout", ctrl.logout);
router.post("/current", ctrl.current);

// router.delete("/:contactId", validateMongoId, ctrl.removeContact);

// router.put(
//   "/:contactId",
//   validateMongoId,
//   validationUpdateContact,
//   ctrl.updateContact
// );

// router.patch(
//   "/:contactId/favorite",
//   validateMongoId,
//   validationUpdateFavorite,
//   ctrl.updateContact
// );

module.exports = router;
