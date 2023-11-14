import express from "express";
import Joi from "joi";
import { listContacts } from "../../utils/listContacts.js";
import { getContactsById } from "../../utils/getContactsById.js";
import { addContact } from "../../utils/addContact.js";
import { removeContact } from "../../utils/removeContact.js";
import { updateContacts } from "../../utils/updateContacts.js";

export const router = express.Router();

const schema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.string(),
});

const schemaIsRequired = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ contacts, itemContacts: contacts.length });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId);
  if (contact) {
    res.status(200).json({ id: contactId, contact });
  } else {
    res.status(404).json({ massege: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const result = schemaIsRequired.validate(req.body);
  if (result.error) {
    res.status(400).json({ massege: result.error.message });
  } else {
    const { name, email, phone } = req.body;
    if (name && email && phone) {
      const newContact = await addContact(name, email, phone);
      res.status(201).json({ newContact, message: "post" });
    } else {
      res.status(404).json({ massege: "missing required name - field" });
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const isDeleted = await removeContact(contactId);
  if (isDeleted) {
    res.status(200).json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({ massege: result.error.message });
  } else {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (name || email || phone) {
      const updatedConact = await updateContacts(contactId, req.body);
      if (updatedConact) {
        res.status(200).json({ updatedConact, message: "updated" });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } else {
      res.status(400).json({ message: "missing fields" });
    }
  }
});
