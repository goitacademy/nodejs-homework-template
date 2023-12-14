const express = require("express");
// const Joi = require("joi");
// const contactsController = require("../../models/contactsFuns");

const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contactsFuns");
const contactSchema = require("./validationSchemas");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = contactSchema.validate(req.body, { abortEarly: false });

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error handling the POST request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await removeContact(contactId);
    if (result) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  console.log("Updating contact with ID:", contactId);
  console.log("Request Body:", req.body);

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const { error } = contactSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const updatedContact = await updateContact(contactId, { name, email, phone });

  if (updatedContact) {
    return res.status(200).json(updatedContact);
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
