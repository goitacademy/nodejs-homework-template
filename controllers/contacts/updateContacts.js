import { updateContact } from "../../models/contacts.js";
import { updateDataSchema } from "../../validation.js";

async function updateContacts(req, res, next) {
  try {
    const validationResult = updateDataSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: "missing fields" });
    }
    const contactId = req.params.contactId;
    const changes = await updateContact(contactId, req.body);
    res.status(200).json({ changes });
  } catch (error) {
    next(error);
  }
}

export { updateContacts };
