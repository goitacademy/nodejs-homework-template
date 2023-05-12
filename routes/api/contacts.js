const express = require("express");
const ctrl = require("../../controllers/contacts");
const {
  validateBodyPost,
  validateBodyPut,
  validateBodyPatch,
  isValidId,
  authenticate,
} = require("../../middlewares");

const { dataValidator, favoriteValidator } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBodyPost(dataValidator), ctrl.post);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBodyPut(dataValidator),
  ctrl.updateById
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBodyPatch(favoriteValidator),
  ctrl.updateFavorite
);

module.exports = router;
