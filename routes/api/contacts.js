const express = require("express");

const ctrl = require("../../controllers/contacts/contacts");

const {validateBody} = require("../../middlewares");
const {isValidId}= require("../../middlewares");
const { schemas }= require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:contactId", isValidId, validateBody(schemas.addSchema), ctrl.updateContactById);

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete("/:contactId", isValidId, ctrl.deleteContactById);

module.exports = router;
