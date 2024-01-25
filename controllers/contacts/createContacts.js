import { addContact } from "../../models/contacts.js";

async function createContacts(req, res, next) {
  try {
    const postContact = await addContact(req.body);
    return res.status(201).json({ postContact });
  } catch (error) {
    next(error);
  }
}

export { createContacts };
