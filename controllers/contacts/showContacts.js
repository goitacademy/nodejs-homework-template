

import { getContactById } from "../../models/contacts.js";
export async function showContacts(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact.length === 0) {
    return res.status(404).json({ message: "not found" });
  }
  res.json({ status: "succes", code: 200, contact });
}
