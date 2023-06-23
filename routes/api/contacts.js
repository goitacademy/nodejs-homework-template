const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const {schemas} = require('../../models/contact'); 

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", isValidId, ctrl.removeContact);

router.put("/:id",isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch("/:id/favorite", isValidId, validateBody, ctrl.updateFavorite);

module.exports = router;
