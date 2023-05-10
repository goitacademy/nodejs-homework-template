const express = require("express");
const contacts = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  // console.log(data);
  res.json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params;
  const contactById = await contacts.getContactById(id);
  contactById
    ? res.json(contactById)
    : res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const addContact = await contacts.addContact(name, email, phone);
  res.status(201).json(addContact);
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
