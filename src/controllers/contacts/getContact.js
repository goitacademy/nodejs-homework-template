const { Contact } = require("../../schemas/contact");

async function getContact(req, res, next) {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);

  if (contact) {
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: "Not found" });
}

module.exports = getContact;
