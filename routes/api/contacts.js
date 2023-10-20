const express = require("express");
const {
  getAllContacts,
  getOneContact,
  addNewContact,
  deleteContact,
  updContact,
  updateStatusContact,
  filterContacts,
} = require("../../controllers/contactsController");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, filterContacts, getAllContacts);

router.get("/:id", authenticate, getOneContact);

router.post("/", authenticate, addNewContact);

router.delete("/:id", authenticate, deleteContact);

router.put("/:id", authenticate, updContact);

router.patch("/:id/favorite", authenticate, updateStatusContact);

module.exports = router;
