import { addContact } from "../../models/contacts.js";
import { addDataSchema } from "../../validation.js";

async function createContacts(req, res, next) {
  try {
    const validationResult = addDataSchema.validate(req.body);
    if (validationResult.error) {
      console.log(validationResult.error.message);
      return res.status(400).json({ message: "missing required name - field" });
    }
    const postContact = await addContact(req.body);
    res.status(201).json({ postContact });
  } catch (error) {
    next(error);
  }
}

export { createContacts };
