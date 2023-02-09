const express = require("express");
const contacts = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allBooks = await contacts.listContacts();
    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const idContact = await contacts.getContactById(contactId);
    if (!idContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(idContact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleContact = await contacts.removeContact(contactId);
    if (!deleContact) {
      return res.status(404).json("Not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
