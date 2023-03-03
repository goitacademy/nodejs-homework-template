const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
//  const { updateContact,
//   removeContact,
//   addContact,
//   getById,
//   allContacts,
//   serchInContacts,
//   chengOfPart,
//  } = require("../../controller/contactsController/index");
const allContacts = require("../../controller/contactsController/allContacts");
const updateContact = require("../../controller/contactsController/updateContact");
const removeContact = require("../../controller/contactsController/removeContact");
const addContact = require("../../controller/contactsController/addContact");
const getById = require("../../controller/contactsController/getById");
const chengOfPart = require("../../controller/contactsController/chengOfPart");
const serchInContacts = require("../../controller/contactsController/serchInContacts");
// const controllerContacts = require("../../controller/contacts");
// const controller = require('../../controller/index')

router.get("/", allContacts);
router.get("/:contactId", getById);

router.get("/search", serchInContacts);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId", chengOfPart);

module.exports = router;
