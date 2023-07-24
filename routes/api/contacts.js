const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();
const { validateBodyContacts, isValidId } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", ctrl.add);

router.put(
  "/:id",
  isValidId,
  validateBodyContacts(schemas.schemaContacts),
  ctrl.updateById
);
router.patch(
  "/:id/favorite",
  isValidId,
  validateBodyContacts(schemas.schemaFavorite),
  ctrl.updateByFavorite
);
router.delete("/:id", isValidId, ctrl.deleteById);

module.exports = router;
