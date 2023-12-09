const express = require("express");

const ctrl = require("../../controllers/controllers");

const addSchema = require("../../schemas/schemas");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validateBody(addSchema.addShema), ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put("/:contactId", authenticate, isValidId, validateBody(addSchema.addShema), ctrl.updateContact);

router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(addSchema.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router;
