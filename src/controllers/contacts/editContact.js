const { Contact } = require("../../schemas/contact");
const { schemaOptional } = require("../../schemas/validation");

async function editContact(req, res, next) {
  const id = req.params.contactId;
  const owrenId = req.user.id;
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const validationResult = schemaOptional.validate(body);
  if (validationResult.error) {
    return res.status(400).json({ message: "invalid value content" });
  }

  const contact = await Contact.findOneAndUpdate(
    { _id: id, owner: owrenId },
    body,
    { new: true }
  ).select({ __v: 0, owner: 0 });
  if (contact) {
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: "Not found" });
}

module.exports = editContact;
