const express = require("express");
const {
  getAllContacts,
  getOneContact,
  addNewContact,
  deleteContact,
  updContact,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:id", getOneContact);

router.post("/", addNewContact);

router.delete("/:id", deleteContact);

router.put("/:id", updContact);

module.exports = router;
