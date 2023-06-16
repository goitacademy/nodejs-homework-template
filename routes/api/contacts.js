const express = require("express");

const ctrl = require("../../controllers/contact");

const { validateBody, isValidId } = require("../../middleWares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", isValidId, ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.add);

router.post("/", validateBody(schemas.addschema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addschema),
  ctrl.update
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
