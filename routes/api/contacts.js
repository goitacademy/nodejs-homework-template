const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./../../models/contacts.js");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      res
        .status(400)
        .json({ message: "missing required name, email, or phone field" });
      return;
    }

    await addContact({ name, email, phone });
    res.status(201).json({ message: "contact added" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactToRemove = await getContactById(contactId);

    if (!contactToRemove) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const savedContact = await updateContact(contactId, req.body);

    if (!savedContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json({ updated: savedContact });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
