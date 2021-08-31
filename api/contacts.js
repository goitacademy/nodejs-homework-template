const express = require("express");

const { contacts: ctrl } = require("../controllers");
const { authenticate } = require("../middlewares");

const router = express.Router();

router.get("/", ctrl.listContacts);
router.get("/:contactId", ctrl.getById);
router.delete("/:contactId", ctrl.removeContact);
router.post("/", authenticate, ctrl.addContact);
router.patch("/:contactId", ctrl.updateContact);
router.patch("/:contactId/favorite", ctrl.updateField);

module.exports = router;
