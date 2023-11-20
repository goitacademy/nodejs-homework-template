import express from "express";
import { postContactSchema } from "./validators/postContactSchema.js";
import { updateContactSchema } from "./validators/updateContactSchema.js";
import { getContactById } from "../../repositories/contacts/getContacts.js";
import { addContact } from "../../repositories/contacts/addContact.js";
import { removeContact } from "../../repositories/contacts/removeContact.js";
import { updateContact } from "../../repositories/contacts/updateContact.js";
import { indexContacts } from "../../controllers/contacts/indexContacts.js";
export const router = express.Router();

router.get("/", indexContacts);

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(contact);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = postContactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const newContact = await addContact(req.body);
      res.status(201).json(newContact);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removed = await removeContact(contactId);

    if (removed) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const { contactId } = req.params;
      const body = req.body;
      const updated = await updateContact(contactId, body);

      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
