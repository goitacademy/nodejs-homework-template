// @ts-nocheck
const express = require("express");
const {getAll, getById, add, deleteContact, update} = require('../../controllers/contacts');

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", add);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", update);

module.exports = router;
