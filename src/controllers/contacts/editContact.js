const { Contact } = require("../../schemas/contact");
const { schemaOptional } = require("../../schemas/validation");

async function editContact(req, res, next) {
  const id = req.params.contactId;
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const validationResult = schemaOptional.validate(body);
  if (validationResult.error) {
    return res.status(400).json({ message: "invalid value content" });
  }

  const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (contact) {
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: "Not found" });
}

module.exports = editContact;
