const createError = require("http-errors");
const { Contact } = require("../../models/contacts/contact");

async function updateStatusContact(req, res) {
  const { body } = req;
  if (!body) {
    throw createError(400, "Missing field favorite");
  }
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    throw createError(404, "Not found");
  }
  res.json(contact);
}

module.exports = updateStatusContact;
