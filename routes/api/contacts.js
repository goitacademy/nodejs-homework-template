const express = require("express");

const router = express.Router();

const Contact = require("../../models/contact");
const User = require("../../models/user");

const { boolean } = require("joi");

const auth = require("../../config/authorization")

const contactsCtrl = require('../../controller/contactsCtrl')


// Manage contacts

router.get("/", auth, contactsCtrl.getContacts)

router.get("/:contactId", auth, contactsCtrl.getContactById)

router.post("/", auth, contactsCtrl.addContact)

router.delete("/:contactId", auth, contactsCtrl.deleteContact)

router.put("/:contactId", auth, contactsCtrl.updateContactById)

router.patch("/:contactId/favorite", auth, contactsCtrl.changeFavouriteContactById)

module.exports = router;