const { readContactById } = require("../models/contacts");
const HttpError = require("../helpers/HttpError");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await readContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getContactById;