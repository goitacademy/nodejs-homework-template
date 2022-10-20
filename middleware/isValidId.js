const { isValidObjectId } = require("mongoose");
const RequestError = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);

  if (!result) {
    throw RequestError(404, `id ${contactId} is not valid`);
  }
  next();
};

module.exports = isValidId;
