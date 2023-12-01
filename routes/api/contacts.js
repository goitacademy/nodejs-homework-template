const express = require("express");
const ctrl = require("../../controllers/contacts");
const {
  validateBody,
  isValidId,
  validateFavorite,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.validateData), ctrl.add);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.validateData),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavorite(schemas.updateFavorite),
  ctrl.updateFavoriteById
);

router.delete("/:contactId", isValidId, ctrl.deleteById);

module.exports = router;
