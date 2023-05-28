
const express = require("express");
const router = express.Router();

const findContactById = require("../../controllers/findContactById");
const addContact = require("../../controllers/addContact");
const deleteContact = require("../../controllers/deleteContact");
const updateContact = require("../../controllers/updateContact");
const contactList = require("../../controllers/contactList");


router.get("/", contactList);

router.get("/:contactId", findContactById);

router.post("/", addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

module.exports = router;
