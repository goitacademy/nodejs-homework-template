const express = require("express");

const ctrl = require("../../controllers/controllers");

const addSchema = require("../../schemas/schemas");

// const updateFavoriteSchema = require("../../schemas/schemas");

const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(addSchema.addShema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put("/:contactId", isValidId, validateBody(addSchema.addShema), ctrl.updateContact);

router.patch("/:contactId/favorite", isValidId, validateBody(addSchema.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router;
