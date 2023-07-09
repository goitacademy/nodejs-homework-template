const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { shemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(shemas.addSchema), ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(shemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(shemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
