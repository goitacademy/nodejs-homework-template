const createError = require("http-errors");
const { Contact } = require("../../models/contacts/contact");

async function getById(req, res) {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw createError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
}

module.exports = getById;
