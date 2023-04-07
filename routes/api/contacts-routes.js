const express = require("express");

const ctrlWrapper = require('../../controllers/contacts-controlers')

const {validateBody} = require('../../utils')

const { getContactById, addContact, listContacts, removeContact, updateContact } = require('../../controllers/contacts-controlers')

// const ctrl = require('../../controllers/contacts-controlers')







const router = express.Router();



router.get('/', listContacts)


router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

module.exports = router;
