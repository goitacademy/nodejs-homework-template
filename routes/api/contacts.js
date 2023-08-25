const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Wystąpił błąd serwera." });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);
    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name) {
    return res.status(400).json({ message: "missing required name - field" });
  }
  if (!email) {
    return res.status(400).json({ message: "missing required name - field" });
  }
  if (!phone) {
    return res.status(400).json({ message: "missing required name - field" });
  }

  try {
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the contact" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const isRemoved = await removeContact(contactId);

  if (isRemoved) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const data = req.body;
  const isUpdated = await updateContact(contactId, data);

  if (!data.name) {
    return res.status(400).json({ message: "missing required name - field" });
  }
  if (!data.email) {
    return res.status(400).json({ message: "missing required name - field" });
  }
  if (!data.phone) {
    return res.status(400).json({ message: "missing required name - field" });
  }

  if (isUpdated) {
    res.status(200).json(isUpdated);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
