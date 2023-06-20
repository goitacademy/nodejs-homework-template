const express = require("express");

const {ctrlWrapper} = require("../../helpers")
const { validation, isValidId} = require("../../middelewares");
const {schemas} = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.put("/:id", isValidId, validation(schemas.addSchema), ctrlWrapper(ctrl.updateContact));

router.patch("/:id/favorite", isValidId, validation(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact));

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

module.exports = router;
