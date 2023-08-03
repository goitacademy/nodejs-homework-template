const express = require("express");
const validateBody = require("../../middleware/validateBody");
const {contactsSchema}=require('../../schema');
const {ctrlWrapper}= require('../../helpers')
const { getAll, getById, addContact, deleteById, updateById } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(getAll));

router.get("/:contactId", ctrlWrapper(getById));

router.post("/", validateBody(contactsSchema.addSchema), ctrlWrapper(addContact));

router.delete("/:contactId", ctrlWrapper(deleteById));

router.put("/:contactId", validateBody(contactsSchema.addSchema), ctrlWrapper(updateById));

module.exports = router;
