const express = require("express");

const ctrl = require("../../controllers/contact");

const {
  validateBody,
  isValidId,
  validateFavorite,
  authenticate,
} = require("../../middleWares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, ctrl.add);

router.post("/", authenticate, validateBody(schemas.addschema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateFavorite,
  validateBody(schemas.addschema),
  ctrl.update
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,

  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
