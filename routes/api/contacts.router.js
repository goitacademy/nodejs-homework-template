const express = require("express");

const router = express.Router();

const tryCatchWrapper = require("../../helpers");

const {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/controllers");

router.get("/", getContacts);

router.get("/:contactId", tryCatchWrapper(getContactByID));

router.post("/", postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putContact);

module.exports = router;
