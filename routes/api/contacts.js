const express = require("express");
const {
  getContacts,
  getContact,
  deleteContact,
  createNewContact,
  changeContact,
} = require("../../controller/controller.contacts");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContact);

router.post("/", createNewContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", changeContact);

module.exports = router;
