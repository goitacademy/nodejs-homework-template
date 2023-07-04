const express = require("express");
const {
  getContactsList,
  getContactsById,
  createContact,
  deleteContact,
  changeContact,
} = require("../../controllers/index");

const router = express.Router();

router.get("/", getContactsList);

router.get("/:contactId", getContactsById);

router.post("/", createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", changeContact);

module.exports = router;
