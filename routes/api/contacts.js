const express = require("express");
const router = express.Router();

const { authenticate, validateBody, isValidId } = require("../../middleware");
const { schemas } = require("../../models/contact");

const ctrl = require("../../controllers/contact");

router.use(authenticate);

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateContact
);

router.delete("/:contactId", isValidId, ctrl.removeContact);

module.exports = router;
