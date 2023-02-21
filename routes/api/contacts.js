const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { validation } = require("../../midlewares");
const { contactSchema } = require("../../schemas");

const router = express.Router();
// GET /api/contacts/
router.get("/", ctrl.getAll);

// GET /api/contacts/:contactId
router.get("/:contactId", ctrl.getById);

// POST /api/contacts/
router.post("/", validation(contactSchema), ctrl.add);

// DELETE /api/contacts/:contactId
router.delete("/:contactId", ctrl.remove);

// UPDATE /api/contacts/:contactId
router.put("/:contactId", validation(contactSchema), ctrl.update);

module.exports = router;
