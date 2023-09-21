const express = require("express");

const ctrl = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema, "POST"), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put("/:contactId", isValidId, validateBody(schemas.addSchema, "PUT"), ctrl.updateContact);

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema, "PATCH"), ctrl.updateFavorite);

module.exports = router;

