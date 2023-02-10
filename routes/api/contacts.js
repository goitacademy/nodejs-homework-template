import express from "express";
import {
  listContacts,
  getContactById,
  removeContact,
  updateContact,
} from "../../models/contacts.js";
import addContact from "../../models/contacts.js";
import { contactValidator } from "./../../utils/validators/validator.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json(contact);
  }
});

router.post("/", async (req, res, next) => {
  const { error } = contactValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const contact = await addContact(req.body);
  if (contact) {
    res.status(201).json(contact);
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (contact) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  const { error } = contactValidator(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  if (!name && !email && !phone) {
    return res.status(400).json({ message: "missing fields" });
  }

  const contact = await getContactById(contactId);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
  } else {
    const updatedContact = await updateContact(contactId, req.body);

    res.status(200).json(updatedContact);
  }
});

export default router;
