const express = require("express");
const ctrl = require("../../controllers/controllers");
const { validateBody, isValidId } = require("../../middlewares");
const { shemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(shemas.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(shemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(shemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
