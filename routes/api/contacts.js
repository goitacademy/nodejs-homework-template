const express = require("express");
const isValidId = require("../../midleware/helpers");
const router = express.Router();

const { contacts } = require("../../controllers");

router.get("/", contacts.getAllContacts);
router.get("/:contactId", isValidId, contacts.getById);
router.post("/", contacts.addContacts);
router.delete("/:contactId", contacts.deleteContacts);
router.put("/:contactId", isValidId, contacts.updateContacts);
router.patch("/:contactId/favorite", isValidId, contacts.updateStatusContact);


module.exports = router;