const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBody, isValidId } = require("../../middlewares");
const schemas = require("../../schemes/contacts");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addContactSchema), ctrl.add);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", isValidId, ctrl.deleteById);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.updateContactSchema),
  ctrl.updateById
);

module.exports = router;
