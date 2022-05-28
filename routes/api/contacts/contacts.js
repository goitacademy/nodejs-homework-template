const { Router } = require("express");
const { contactsControllers } = require("../../../controllers");
const { guard, contactsValidation } = require("../../../middleware");

const {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
  validateQuery,
} = contactsValidation;
const {
  getContacts,
  getContactById,
  postContact,
  removeContact,
  updateContact,
} = contactsControllers;

const router = Router();

router.route("/").get([guard, validateQuery], getContacts);
router.route("/:id").get([guard, validateId], getContactById);
router.route("/").post([guard, validateCreate], postContact);
router.route("/:id").delete([guard, validateId], removeContact);
router.route("/:id").put([guard, validateId, validateUpdate], updateContact);
router
  .route("/:id/favorite")
  .patch([guard, validateId, validateUpdateFavorite], updateContact);

module.exports = router;
