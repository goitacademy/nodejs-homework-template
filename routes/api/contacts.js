const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers");
const {
  contacts: { schemas },
} = require("../../models");
const { validateBody, isValidId } = require("../../middlewares");

router.get("/", ctrl.contacts.getAll);

router.get("/:contactId", isValidId, ctrl.contacts.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.contacts.create);

router.delete("/:contactId", isValidId, ctrl.contacts.remove);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.contacts.update
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "missing field favorite"),
  ctrl.contacts.updateStatusContact
);

module.exports = router;
