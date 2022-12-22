const express = require('express')

const router = express.Router()

const getAllContacts = require("../../controllers/contacts/getAllContacts");
const getById = require("../../controllers/contacts/getById");
const addContact = require("../../controllers/contacts/add");
const updateById = require("../../controllers/contacts/updateById");
const deleteContact = require("../../controllers/contacts/delete");

// =====================  GET ALL  =====================
router.get("/", getAllContacts);

// =====================  GET BY ID  =====================
router.get("/:contactId", getById);

// =====================  ADD CONTACT  ==================
router.post("/", addContact);

// =====================  UPDATE CONTACT BY ID ==================
router.put("/:contactId", updateById);

// =====================  DELETE CONTACT BY ID ==================
router.delete("/:contactId", deleteContact);

module.exports = router;
