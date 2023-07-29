const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contacts/contact");

const router = express.Router();

// Get all contacts =========================================

router.get("/", authenticate, ctrl.getAll);

// Get contact by ID ========================================

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

// Create a new contact =====================================

router.post(
  "/",
  authenticate,
  validateBody(schemas.createContactSchema),
  ctrl.addNewContact
);

// Update a contact =========================================

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.createContactSchema),
  ctrl.updateById
);

// Patch a contact =========================================

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

// Delete a contact =========================================

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
