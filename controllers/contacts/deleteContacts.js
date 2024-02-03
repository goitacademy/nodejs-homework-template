const { removeContact } = "#models/contacts.js";

async function deleteContacts(req, res, next) {
  const { contactId } = req.params;

  try {
    await removeContact(contactId);
    res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
}

export { deleteContacts };
