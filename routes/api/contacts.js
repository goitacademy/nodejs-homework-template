import express from "express";
import { updateContactSchema } from "./validators/updateContactSchema.js";
import { showContacts } from "../../controllers/contacts/showContacts.js";
import { removeContact } from "../../repositories/contacts/removeContact.js";
import { updateContact } from "../../repositories/contacts/updateContact.js";
import { indexContacts } from "../../controllers/contacts/indexContacts.js";
import { createContacts } from "../../controllers/contacts/createContacts.js";
export const router = express.Router();

router.get("/", indexContacts);

router.get("/:contactId", showContacts);

router.post("/", createContacts);

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
