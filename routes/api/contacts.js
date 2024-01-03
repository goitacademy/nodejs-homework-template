const express = require("express");
const {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateContactFavorite,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite", updateContactFavorite);

module.exports = router;
