const express = require("express");

const router = express.Router();

const { validateBody, isValidId, isValidBody } = require("../../middelewares");
const { schemas } = require("../../models/contact");

const ctrl = require("../../controllers/contacts");
router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addNewContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.ubdateById
);

router.patch(
  "/:contactId",
  isValidId,
  isValidBody,
  validateBody(schemas.favotiteSchema),
  ctrl.updateStatusContact
);

module.exports = router;