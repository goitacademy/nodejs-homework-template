const express = require("express");
// const Joi = require("joi");
const ctrl = require("../../controllers/contacts.js");
// const {
//   addSchema,
//   putSchema,
//   patchSchema,
// } = require("../../models/contacts.js");
const router = express.Router();
const { isValidId } = require("../../helpers");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put("/:contactId", isValidId, ctrl.updateContact);

router.patch("/:contactId/favorite", isValidId, ctrl.updateFavorite);

module.exports = router;
