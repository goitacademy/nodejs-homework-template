import { getAll } from "../services/contacts.helpers.js";

export async function getAllContacts(req, res, next) {
  try {
    const { page, limit } = req.query;
    const contacts = await getAll(page, limit);
    return res.status(200).json(contacts);
  } catch (e) {
    return res.status(500).json(`An error occured: ${e.message}`);
  }
}
