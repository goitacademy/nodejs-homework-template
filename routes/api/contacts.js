const express = require("express");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

const isValidId = require("../../middlewares");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put("/:contactId", isValidId, ctrl.updateContact);

router.patch("/:contactId/favorite", isValidId, ctrl.updateStatusContact);

module.exports = router;
