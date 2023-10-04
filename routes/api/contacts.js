const express = require("express");
const {
  getAllContacts,
  getContact,
  deleteContact,
  createContact,
  updateContactBody,
} = require("../../controllers/contactsControllers");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:id", getContact);

router.post("/", createContact);

router.delete("/:id", deleteContact);

router.put("/:id", updateContactBody);

module.exports = router;
