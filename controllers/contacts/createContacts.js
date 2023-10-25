const { addContact } = require("../../models/contacts");
const schema = require("../../validators/createContactValidator");

async function postContacts(req, res, next) {
  const { name, email, phone } = req.body;

  const { error } = schema.validate({ name, email, phone });
  if (error) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newContact = await addContact({ name, email, phone });
  if (newContact) {
    return res.status(201).json(newContact);
  }
  return res.status(500).json({ message: "Error adding a contact" });
}

module.exports = { postContacts };
