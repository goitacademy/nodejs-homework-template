const express = require("express");
const ctrl = require("../../controllers");
const { addSchema, updSchema, updStatusSchema } = require("../../models");
const { validateBody, isBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  isBody,
  validateBody(updSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isBody,
  validateBody(updStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
