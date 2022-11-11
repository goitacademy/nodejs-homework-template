const contacts = require("../../models/contacts");
const HttpError = require("../../helpers/HttpError");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = removeContact;
