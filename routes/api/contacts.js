const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const uId = require("uuid");

const id = uId.v4();

const { validateAddContact } = require("../../validator");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const contactsPath = path.join(
  __dirname,
  "..",
  "..",
  "models",
  "contacts.json"
);

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const wantedContact = await getContactById(id);
    if (!wantedContact) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(wantedContact);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const { error, value } = validateAddContact(req.body);
    if (error) {
      res.status(400).send(error.message);
    }
    const addedContact = await addContact(req.body);
    res.status(201).json(addedContact);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await removeContact(contactsPath, contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    
    res
      .status(200)
      .json({ message: `contact '${deletedContact.name}' deleted` });
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "missing fields" });
    }
    const { error, value } = validateAddContact(req.body);
    if (error) {
      res.status(400).send(error.message);
    }

    const updatedContact = await updateContact(id, req.body);

    if (updatedContact === null) {
      res.status(404).json({ message: "Not found" });
    }

    res.json(updatedContact);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
