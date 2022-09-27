const RequsetError = require("../../helpers");
const contacts = require("../../models/contacts");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw RequsetError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateContact;
