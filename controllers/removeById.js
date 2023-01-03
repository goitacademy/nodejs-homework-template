const contacts = require("../models/contacts");

const HttpError = require("../helpers");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContactById(contactId);
  if (!result) {
    throw HttpError.HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = removeById;
