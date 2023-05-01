const express = require("express");
const listContacts = require("../../controllers/listContacts");
const getById = require("../../controllers/getById");
const addContact = require("../../controllers/addContact");
const removeContact = require("../../controllers/removeContact");
const updateContact = require("../../controllers/updateContact");
const validateData = require("../../helpers/addValidator");
const validateUpdateData = require("../../helpers/updateValidator");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getById);

router.post("/", validateData, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateUpdateData, updateContact);

module.exports = router;
