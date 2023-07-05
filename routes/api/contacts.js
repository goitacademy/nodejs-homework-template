const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewarpes");
const schemasJoi = require("../../schemas/contacts");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemasJoi.addSchema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.remove);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemasJoi.addSchema),
  ctrl.update
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemasJoi.updateFaforiteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
