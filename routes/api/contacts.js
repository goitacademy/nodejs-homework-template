const express = require("express");

const router = express.Router();
const { validation } = require("../../helpers/validation");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      res.status(404).json(contact);
    } else {
      res.json(contact);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", validation, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "missing required name/email/phone field" });
    }
    const contact = { name, email, phone };
    await addContact(contact);
    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const isContactRemoved = removeContact(contactId);
  if (isContactRemoved) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", validation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    if (!body) {
      return res.status(400).json({ message: "missing fields" });
    }
    const updatedContact = await updateContact(contactId, body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    } else {
      return res.status(200).json(updatedContact);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
