const express = require("express");
const {
  getContacts,
  getContactByIdController,
  postContact,
  deleteContact,
  putContact,
} = require("../controllers/contactController");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactByIdController);

router.post("/", postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putContact);

module.exports = router;
