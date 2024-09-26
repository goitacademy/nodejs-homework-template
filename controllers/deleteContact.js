const { removeContact } = require("../models/contacts");
const HttpError = require("../helpers/HttpError");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = deleteContact;