const express = require("express");
const {
  getlistContacts,
  getContact,
  createContact,
  changeContact,
  deleteContact,
} = require("../../controlers/contactControler");
const { validateContact } = require("../../middlewares/contactMiddlewares");

const router = express.Router();

router.get("/", getlistContacts);

router.get("/:contactId", getContact);

router.post("/", validateContact, createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", changeContact);

module.exports = router;
