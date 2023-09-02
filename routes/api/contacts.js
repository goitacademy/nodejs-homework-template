const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");
const { validateContact } = require("../../models/contactsValidator.js");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts(); 
    res.json(contacts);
  } catch (error) {
    next(error); 
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId); 
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error); 
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = validateContact(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId); 
    if (contact) {
      res.json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error); 
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = validateContact(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
