const express = require("express");
const {
  getAllContacts,
  getOneContact,
  addNewContact,
  deleteContact,
  updContact,
  updateStatusContact,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:id", getOneContact);

router.post("/", addNewContact);

router.delete("/:id", deleteContact);

router.put("/:id", updContact);

router.patch("/:id/favorite", updateStatusContact);

module.exports = router;
