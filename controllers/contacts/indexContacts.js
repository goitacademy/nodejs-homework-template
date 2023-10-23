import { listContacts } from "../../models/contacts.js";

export async function indexContacts(req, res, next) {
  const contactsList = await listContacts();

  res.json({ status: "succes", code: 200, contactsList });
}
