const { Router } = require("express");
const {
  getContacts,
  getContactById,
  postContact,
  removeContact,
  updateContact,
} = require("../../../controllers");
const {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
  validateQuery,
} = require("../../../middleware");

const router = Router();

router.route("/").get(validateQuery, getContacts);
router.route("/:id").get(validateId, getContactById);
router.route("/").post(validateCreate, postContact);
router.route("/:id").delete(validateId, removeContact);
router.route("/:id").put(validateId, validateUpdate, updateContact);
router
  .route("/:id/favorite")
  .patch(validateId, validateUpdateFavorite, updateContact);

module.exports = router;
