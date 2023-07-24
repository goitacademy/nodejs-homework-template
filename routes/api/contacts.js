const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contacts/contact");

const router = express.Router();

// Get all contacts =========================================

router.get("/", ctrl.getAll);

// Get contact by ID ========================================

router.get("/:contactId", isValidId, ctrl.getById);

// Create a new contact =====================================

router.post("/", validateBody(schemas.createContactSchema), ctrl.addNewContact);

// Update a contact =========================================

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.createContactSchema),
  ctrl.updateById
);

// Patch a contact =========================================

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

// Delete a contact =========================================

router.delete("/:contactId", isValidId, ctrl.deleteById);

module.exports = router;
