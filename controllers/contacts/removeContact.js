const contacts = require("../../models/contacts");
const { requestError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = removeContact;
