const express = require("express");
const ctrl = require("../../controllers/contacts");
const {
  validateBodyPost,
  validateBodyPut,
  validateBodyPatch,
  isValidId,
} = require("../../middlewares");

const { dataValidator, favoriteValidator } = require("../../models/contact");
const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBodyPost(dataValidator), ctrl.post);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBodyPut(dataValidator),
  ctrl.updateById
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyPatch(favoriteValidator),
  ctrl.updateFavorite
);

module.exports = router;
