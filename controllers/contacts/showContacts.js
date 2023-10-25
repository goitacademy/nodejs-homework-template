const { getContactById } = require("../../models/contacts");

async function showByIdContacts(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    return res.json(contact);
  }
  return res.status(404).json({ message: "Not found" });
}

module.exports = { showByIdContacts };
