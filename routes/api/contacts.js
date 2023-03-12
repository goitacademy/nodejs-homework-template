const express = require("express");
const {
  getlistContacts,
  getContact,
  validateContact,
  createContact,
  changeContact,
  deleteContact,
} = require("../../controlers/contactControler");


const router = express.Router();

router.get("/", getlistContacts);

router.get("/:contactId", getContact);

router.post("/", validateContact,createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", changeContact);

module.exports = router;
