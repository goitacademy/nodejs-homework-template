
const express = require("express");
const router = express.Router();

const findContactById = require("../../controllers/findContactById");
const addContact = require("../../controllers/addContact");
const deleteContact = require("../../controllers/deleteContact");
const updateContact = require("../../controllers/updateContact");
const contactList = require("../../controllers/contactList");
const validate = require('../../middlewares/validator');
const addSchema = require("../../shemaJoi/shemaJoi");


router.get("/", contactList);

router.get("/:contactId", findContactById);

router.post("/", validate(addSchema), addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId",validate(addSchema), updateContact);

module.exports = router;
