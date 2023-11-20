import { listContacts } from "../../repositories/contacts/listContacts.js";

export async function indexContacts(req, res, next) {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
