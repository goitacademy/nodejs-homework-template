const Contact = require("../../models/contact");
const { createError } = require("../../helpers");

async function update(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw createError(404, "Not found");
  }
  res.json(contact);
}

module.exports = update;
