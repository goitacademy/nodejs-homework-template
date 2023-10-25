const { updateContact } = require("../../models/contacts");
const schema = require("../../validators/createContactValidator");

async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const { error } = schema.validate({ name, email, phone });

  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const updatedContacts = await updateContact(contactId, { name, email, phone });
  if (updatedContacts) {
    return res.json(updatedContacts);
  }
  return res.status(404).json({ message: "Not found" });
}

module.exports = { updateContacts };
