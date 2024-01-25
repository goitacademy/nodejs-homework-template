import { removeContact } from "../../models/contacts.js";

async function deleteContacts(req, res, next) {
  try {
    const contacId = await removeContact(req.params.contactId);
    if (!contacId) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ contacId, message: "contact deleted" });
  } catch (error) {
    next(error);
  }
}

export { deleteContacts };
