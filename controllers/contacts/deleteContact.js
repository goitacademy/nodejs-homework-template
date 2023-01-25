const { httpError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contactToDelete = await Contact.findById(contactId);
  if (!contactToDelete) {
    return next(httpError(404, "Not found"));
  }
  await Contact.findByIdAndRemove(contactId);
  return res.status(200).json({ message: "contact deleted" });
}

module.exports = {
  deleteContact,
};
