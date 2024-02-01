import { removeContact } from "#models/contacts/removeContact.js";

async function deleteContacts(req, res, next) {
  const { contactId } = req.params;

  try {
    await removeContact(contactId);
    res.status(204).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(400).json({ message: "Not found" });
  }
}

export { deleteContacts };
