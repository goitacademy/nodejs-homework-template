import { removeContact } from "../../models/contacts.js";

export async function deleteContacts(req, res, next) {
  const { contactId } = req.params;

  const remove = await removeContact(contactId);
  if (remove.length === 0) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
}
