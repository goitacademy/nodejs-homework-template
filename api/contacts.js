const express = require("express");

const { contacts: ctrl } = require("../controllers");
const { authenticate } = require("../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);
router.get("/:contactId", authenticate, ctrl.getById);
router.delete("/:contactId", authenticate, ctrl.removeContact);
router.post("/", authenticate, ctrl.addContact);
router.patch("/:contactId", authenticate, ctrl.updateContact);
router.patch("/:contactId/favorite", authenticate, ctrl.updateField);

module.exports = router;
