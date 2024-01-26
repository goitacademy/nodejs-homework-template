import { getContactById } from "../../repositories/contacts/getContactsById.js";

export async function showContacts(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(contact);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
