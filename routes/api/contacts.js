const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not Found" });
  } else res.json(contact);
});

router.post("/", async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.json(newContact);
  } catch (error) {
    res.json({ message: "template message" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const delContact = await removeContact(req.params.contactId);
    if (delContact) res.json({ message: "Contact delete" });
  } catch (error) {
    res.json({ message: "template message" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
