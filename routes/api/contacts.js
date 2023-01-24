const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const { contactsValidation } = require("../../middlewares/validationBody");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post("/", contactsValidation, async (req, res, next) => {
  try {
    const newContacts = await addContact(req.body);

    res.status(201).json(newContacts);
  } catch (err) {
    res.status(404).json({ message: "missing required name field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    const deletedContact = await removeContact(contactId);

    if (!deletedContact.length) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "contact deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.put("/:contactId", contactsValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    await updateContact(contactId, req.body);

    const updatedContact = await getContactById(contactId);
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
