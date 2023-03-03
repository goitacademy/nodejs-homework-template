const Contact = require("../../models/contact");
const { createError } = require("../../helpers");

async function remove(req, res, next) {
  const { contactId } = req.params;
  const contacts = await Contact.findByIdAndRemove(contactId);
  if (!contacts) {
    throw createError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
    code: 200,
  });
}

module.exports = remove;
