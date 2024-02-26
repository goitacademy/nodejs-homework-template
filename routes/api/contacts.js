const express = require("express");
const { listContacts, getContactById } = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    console.error("Error reading contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:contactId", async (req, res) => {
  const contactId = req.params.contactId;
  console.log("Contact ID:", contactId);

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      res.json(contact);
    }
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
