const express = require("express");
const {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controlers/contactControlers");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:id", getOneContact);

router.post("/", createContact);

router.patch("/:id", updateContact);

router.delete("/:id", deleteContact);

module.exports = { contactRouter: router };
