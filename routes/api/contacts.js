const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");



// ===========getting List of All Contacts =================

router.get("/", ctrl.getAllContacts);

// ============Getting a given Contact by  ID ===============

router.get("/:contactId", isValidId, ctrl.getContactById);

// =============Adding a Contact =============================

router.post("/", validateBody(schemas.schemaPut), ctrl.addContact);

// ============ Deleting  a Contact ==========================

router.delete("/:contactId", isValidId, ctrl.removeContact );

// ==============Updating a Contact ===========================

router.put("/:contactId",isValidId, validateBody(schemas.schemaPut), ctrl.updateContact );

// ==============Favorite status update ============

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.schemaPatch),
  ctrl.updateFavorite
);

module.exports = router;
