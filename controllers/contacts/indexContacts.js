import { listContacts } from "../../js/contacts.js";

export async function indexContacts(req, res, next) {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (e) {
    res.status(500).json(`An error occured: ${e}`);
  }
}
