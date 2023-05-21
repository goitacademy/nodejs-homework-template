const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const {
  validateBody,
  validateStatusBody,
  isValidId,
} = require("../../middlewares");
const schemas = require("../../models/contacts");

router.get("/", ctrl.getAll);
router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deleteContactByID);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateStatusBody(schemas.updateFavoriteSchema),
  ctrl.updateContact
);

module.exports = router;
