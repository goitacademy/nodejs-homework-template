const express = require("express");

const {
  getByIdContact,
  getListContact,
  removeByIdContact,
  addContact,
  updateContact,
  updateContactFavorite,
} = require("../../controllers/contacts/index");
const router = express.Router();

router.get("/", getListContact);

router.get("/:contactId", getByIdContact);

router.post("/", addContact);

router.delete("/:contactId", removeByIdContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite", updateContactFavorite);

module.exports = router;
