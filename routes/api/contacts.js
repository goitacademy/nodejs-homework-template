import express from "express";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../../models/contacts.js";

import { schema } from '../../schemas/contacts.js'

const router = express.Router();

router.get("/", async (req, res, next) => {
  // res.json({ message: 'template message' })
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {

  const { contactId } = req.params; 
  const findContact = await getContactById(contactId);
  if (findContact) {
    res.status(200).json(findContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
 

  if (!(req.body.name && req.body.email && req.body.phone)) {
    res.status(400).json({ message: "missing required name - field" });
    return;
  }

  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  
  const { contactId } = req.params;

  const findContact = await removeContact(contactId);
  if (findContact) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      res.status(400).json({
        message: `missing required field`,
        error: validationResult.error,
      });
      return;
    }

    const contactToUpdate = await updateContact(contactId, req.body);

    contactToUpdate
      ? res.status(200).json({ contactToUpdate })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export { router };
