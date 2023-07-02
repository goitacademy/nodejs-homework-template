const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewarpes");
const { schemasJoi } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemasJoi.addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.remove);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemasJoi.addSchema),
  ctrl.update
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemasJoi.updateFaforiteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
