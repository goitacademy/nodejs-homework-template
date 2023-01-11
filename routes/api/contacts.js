const express = require("express");
const { httpError } = require("../../helpers/index.js");

const {
  listContacts,
  getContactById,
  // removeContact,
  addContact,
  // updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return next(httpError(404, "Not found"));
  }

  return res.json(contact);
});

router.post("/", async (req, res) => {
  // const { name, email, phone } = req.body;

  const newContact = await addContact(req.body);

  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
