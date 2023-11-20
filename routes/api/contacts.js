
const express = require("express");
const { validateBody, isValidId } = require("../../middleware");
const schemas = require("../../schemas/contacts");
const ctrl = require("../../controllers/contactsControllers");


const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getById);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:contactId", isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch("/:contactId/favorite", isValidId, ctrl.updateFavorite);

module.exports = router;
