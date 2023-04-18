const contacts = require("../models/contacts");
const HttpError = require("../helpers/HttpError");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Success deleted" });
};

module.exports = deleteById;