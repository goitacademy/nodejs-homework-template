const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "../../models/contacts.json");

const router = express.Router();

const getContactsList = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};

router.get("/", async (req, res, next) => {
  try {
    const contacts = await getContactsList();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = await getContactsList();
  const contact = contacts.find(({ id }) => id === contactId);
  res.status(200).json(contact);
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
