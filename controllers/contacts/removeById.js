const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");

async function getById(req, res) {
  const { contactId } = req.params;
  const contact = await contactsOperations.removeContact(contactId);
  if (!contact) {
    throw createError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
}

module.exports = getById;
