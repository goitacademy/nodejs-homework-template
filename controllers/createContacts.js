import { createContact } from "#services/index.js";

export async function createContacts(req, res, next) {
  try {
    const newContact = await createContact(req.body);
    return res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
