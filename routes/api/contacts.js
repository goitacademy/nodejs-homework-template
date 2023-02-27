const express = require("express");
const { contacts } = require("../../controllers");

const isValidId = require("../../middleware/helpers");
const auth = require("../../middleware/auth");
const router = express.Router();

router.get("/", auth, contacts.getAllContacts);
router.get("/:contactId", auth, isValidId, contacts.getById);
router.post("/", auth, contacts.addContacts);
router.delete("/:contactId", auth, contacts.deleteContacts);
router.put("/:contactId", auth, isValidId, contacts.updateContacts);
router.patch("/:contactId/favorite", auth, isValidId, contacts.updateStatusContact);


module.exports = router;