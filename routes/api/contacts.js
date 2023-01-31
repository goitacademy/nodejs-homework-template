const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { validation, isValidation } = require("../../middlewares");
const { schemas } = require("../../models");
const router = express.Router();
// GET /api/contacts/
router.get("/", ctrl.getAll);

// GET /api/contacts/:contactId
router.get("/:contactId", isValidation, ctrl.getById);

// POST /api/contacts/
router.post("/", validation(schemas.addContactSchema), ctrl.add);

// DELETE /api/contacts/:contactId
router.delete("/:contactId", ctrl.remove);

// UPDATE /api/contacts/:contactId
router.put("/:contactId", validation(schemas.addContactSchema), ctrl.update);

router.patch("/:contactId/favorite", isValidation, validation(schemas.updateFavoriteFieldSchema), ctrl.updateFavorite);

module.exports = router;