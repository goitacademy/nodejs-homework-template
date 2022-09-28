const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");

async function updateById(req, res) {
  const { body } = req;
  if (!body) {
    throw createError(400, "Missing fields");
  }
  const { contactId } = req.params;
  const contact = await contactsOperations.updateContact(contactId, body);
  if (!contact) {
    throw createError(404, "Not found");
  }
  res.json(contact);
}

module.exports = updateById;
