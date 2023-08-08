const express = require("express");
const path = require("path");

const router = express.Router();
const contactsPath = path.join(__dirname, "../../models/contacts.js");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require(contactsPath);

router.get("/", async (req, res) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const result = await getContactById(req.params.contactId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res) => {
  try {
    const result = await removeContact(req.params.contactId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/:contactId", async (req, res) => {
  res.json({ message: "template message" });
});

module.exports = router;
