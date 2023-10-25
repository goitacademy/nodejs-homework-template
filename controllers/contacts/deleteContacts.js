const { removeContact } = require("../../models/contacts");

async function deleteContacts(req, res, next) {
  const { contactId } = req.params;
  const removed = await removeContact(contactId);
  if (removed) {
    return res.json({ message: "Contact deleted" });
  }
  return res.status(404).json({ message: "Not found" });
}

module.exports = { deleteContacts };
