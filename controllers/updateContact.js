const { writeUpdatedContact } = require("../models/contacts");
const HttpError = require("../helpers/HttpError");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await writeUpdatedContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateContact;