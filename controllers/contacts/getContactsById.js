const schemas = require("../../schemas/schemas");
const { Contact } = require("../../db/contactModel");
async function getContactsById(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.find({ _id: contactId });
  if (!contact) {
    return res.status(404).json({ message: "not found" });
  }
  res.json({ data: contact });
}
module.exports = { getContactsById };
