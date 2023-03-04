const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validation, isValidation, authorization, } = require("../../middlewares");
const { schemas } = require("../../models");

// GET /api/contacts/
router.get("/", authorization, ctrl.getAll);

// GET /api/contacts/:contactId
router.get("/:contactId", isValidation, ctrl.getById);

// POST /api/contacts/
router.post("/", authorization, validation(schemas.addContactSchema), ctrl.add);

// DELETE /api/contacts/:contactId
router.delete("/:contactId", ctrl.remove);

// UPDATE All /api/contacts/:contactId
router.put("/:contactId", validation(schemas.addContactSchema), ctrl.update);

// UPDATE a part of the object /api/contacts/:contactId/favorite
router.patch(
  "/:contactId/favorite",
  isValidation,
  validation(schemas.updateFavoriteFieldSchema),
  ctrl.updateFavorite
);

module.exports = router;