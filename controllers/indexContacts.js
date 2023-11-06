import { getAllContacts } from "#services/index.js";

export async function indexContacts(req, res, next) {
  try {
    const contacts = await getAllContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
