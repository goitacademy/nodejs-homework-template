const express = require("express");
const {
  getContacts,
  getContact,
  deleteContact,
  createNewContact,
  changeContact,
  updateStatusContact,
} = require("../../controller/contacts");
const { authByToken } = require("../../middlewar/authByToken");

const router = express.Router();

router.get("/", authByToken, getContacts);

router.get("/:contactId", authByToken, getContact);

router.post("/", authByToken, createNewContact);

router.delete("/:contactId", authByToken, deleteContact);

router.put("/:contactId", authByToken, changeContact);

router.patch("/:contactId/favorite", authByToken, updateStatusContact);

module.exports = router;
