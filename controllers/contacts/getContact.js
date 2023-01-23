const { httpError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return next(httpError(404, "Not found"));
  }
  return res.status(200).json(contact);
}

module.exports = {
  getContact,
};
