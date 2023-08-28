const express = require("express");
const wrap = require("../../controllers/contacts.js");
const validateData = require("../../helpers/validateData.js");


const router = express.Router();

const jsonParser = express.json();

router.get("/", wrap.listContacts);

router.get("/:contactId", wrap.getById);

router.post("/", jsonParser, validateData, wrap.addContact);

router.delete("/:contactId", wrap.removeContact);

router.put("/:contactId", jsonParser, validateData, wrap.updateContact);

module.exports = router;
