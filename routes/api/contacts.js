import express from "express";
const router = express.Router();

import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../../models/contacts.js";

import { validation } from "../../validation/validation.js";

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    return res.status(200).json(allContacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contacts = await getContactById(contactId);
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", validation, async (req, res, next) => {
  const body = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  try {
    const contact = await addContact(body);
    return res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/:contactId", validation, async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  try {
    const contact = await updateContact(contactId, body);
    return res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export { router as contactsRouter };
