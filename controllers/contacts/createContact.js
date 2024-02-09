import { schema } from "../../validation.js";
import { addContact } from "../../models/contacts.js";

export async function createContact(req, res, next) {
  try {
    const bodyToCheck = schema.validate(req.body);

    if (bodyToCheck.error) {
      return res.status(400).json({ message: "missing required name - field" });
    }
    const { name, email, phone } = req.body;
    const newContact = await addContact({ name, email, phone });

    if (!newContact) {
      return res.status(400).json({ message: "Contact already exist" });
    } else {
      res.status(201).json(newContact);
    }
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
