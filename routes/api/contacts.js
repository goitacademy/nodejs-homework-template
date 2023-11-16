import { addContact } from "../../models/controllers/contacts/createContacts.js";
import { removeContact } from "../../models/controllers/contacts/deleteContacts.js";
import { listContacts } from "../../models/controllers/contacts/indexContacts.js";
import { getContactById } from "../../models/controllers/contacts/showContacts.js";
import { updateContact } from "../../models/controllers/contacts/updateContact.js";
import { validationMiddleware } from "../../models/controllers/Validator/validator.js";
import express from "express";

export const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/", validationMiddleware, async (req, res, next) => {
  const newContact = await addContact(req.body);
  if (!newContact) {
    return res.status(400).json({ message: "missing required name - field" });
  }
  return res.status(201).send(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (contact) {
    return res.status(200).json({ message: "contact deleted" });
  }
  return res.status(404).json({ message: "Not Found" });
});

router.put("/:contactId", validationMiddleware, async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.body);
  if (!contact) {
    return res.status(400).json({ message: "missing fields" });
  }
  return res.status(200).json(contact);
});
