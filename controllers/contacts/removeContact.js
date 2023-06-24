const { HttpError } = require("../../helpers");
const contacts = require("../../models/contacts");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeContact;
