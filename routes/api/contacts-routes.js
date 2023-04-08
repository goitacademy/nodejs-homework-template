const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getOneContact,
  addNewContact,
  deleteContact,
  changeContact,
} = require("../../controllers/contacts-controllers");

router.get("/", getAllContacts);

router.get("/:contactId", getOneContact);

router.post("/", addNewContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", changeContact);

module.exports = router;
