const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, validateUpdateStatusContact } = require("../../middlewares");
const schemas = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateUpdateStatusContact(schemas.updateStatusContactSchema),
  ctrl.updateStatusContact
);

module.exports = router;
