const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();

// Get all contacts =========================================

router.get("/", ctrl.getAll);

// Get contact by ID ========================================

router.get("/:contactId", ctrl.getById);

// Create a new contact =====================================

router.post("/", validateBody(schemas.contactSchema), ctrl.addNewContact);

// Update a contact =========================================

router.put("/:contactId", validateBody(schemas.contactSchema), ctrl.updateById);

// Delete a contact =========================================

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
