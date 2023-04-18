const HttpError = require("../helpers/HttpError");
const contacts = require("../models/contacts");

const getById = async (req, res) => {
  console.log(req.params);
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;