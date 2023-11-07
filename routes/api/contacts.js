const express = require("express");
const router = express.Router();
const { getAllContacts, getContactById, updateContact, updateStatusContact, addContacts, deleteContact } = require("../../controllers/index");

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", addContacts);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
