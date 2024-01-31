import { listContacts, removeContact } from "../../models/contacts.js";

export async function deleteContacts(req, res, next) {
  removeContact();
  const contacts = await listContacts();
  const { id } = req.params;
  const newContacts = contacts.findIndex((contact) => contact.id !== id);
  try {
    return res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    if (newContacts === -1) {
      return res.status(404).json(`Not found: ${err}`);
    }
  }
}
