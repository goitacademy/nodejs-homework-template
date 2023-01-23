const { httpError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

async function editContact(req, res, next) {
  const { contactId } = req.params;
  const contactToUpdate = await Contact.findById(contactId);
  if (!contactToUpdate) {
    return next(httpError(404, "Not found"));
  }
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  return res.status(200).json(updatedContact);
}

module.exports = {
  editContact,
};
