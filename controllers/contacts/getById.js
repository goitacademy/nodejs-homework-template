const Contact = require("../../models/contact");
const { createError } = require("../../helpers");

async function getById(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw createError(404, "Not found");
  }
  res.json(contact);
}

module.exports = getById;
