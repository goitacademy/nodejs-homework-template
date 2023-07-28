const express = require("express");
const ctrl = require("../../controllers/contacts/contacts");

const router = express.Router();
const {
  validateBody,
  isValidId,
  authentication,
} = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", authentication, ctrl.getAll);

router.get("/:id", authentication, isValidId, ctrl.getById);

router.post("/", authentication, ctrl.add);

router.put(
  "/:id",
  authentication,
  isValidId,
  validateBody(schemas.schemaContacts),
  ctrl.updateById
);
router.patch(
  "/:id/favorite",
  isValidId,
  authentication,
  validateBody(schemas.schemaFavorite),
  ctrl.updateByFavorite
);
router.delete("/:id", authentication, isValidId, ctrl.deleteById);

module.exports = router;
