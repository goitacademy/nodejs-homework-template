const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts.js");

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
        .json({ message: "Name, email, and phone are required fields" });
      return;
    }

    await addContact({ name, email, phone });
    res.status(201).json({ message: "Contact added" });
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
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      res
        .status(400)
        .json({ message: "Name, email, and phone are required fields" });
      return;
    }

    const savedContact = await updateContact(contactId, { name, email, phone });

    if (!savedContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json({ updated: savedContact });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
      res.status(400).json({ message: "Missing field 'favorite'" });
      return;
    }

    const updatedContact = await updateStatusContact(contactId, { favorite });

    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
