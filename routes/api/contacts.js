const express = require("express");
const router = express.Router();
const { indexContacts } = require("../../controllers/contacts/indexContacts");
const { showByIdContacts } = require("../../controllers/contacts/showContacts");
const { postContacts } = require("../../controllers/contacts/createContacts");
const { deleteContacts } = require("../../controllers/contacts/deleteContacts");
const { updateContacts } = require("../../controllers/contacts/updateContacts");

router.get("/", indexContacts);

router.get("/:contactId", showByIdContacts);

router.post("/", postContacts);

router.delete("/:contactId", deleteContacts);

router.put("/:contactId", updateContacts);

module.exports = router;
