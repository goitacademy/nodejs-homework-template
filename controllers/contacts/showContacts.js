import { listContacts } from "../../models/contacts.js";

export async function showContacts(req, res, next) {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
