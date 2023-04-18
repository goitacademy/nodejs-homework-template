const { ObjectId } = require("mongoose").Types;
const { HttpError } = require("../helpers");

const validateId = (req, res, next) => {
  const { contactId } = req.params;

  if (!ObjectId.isValid(contactId)) {
    throw HttpError(404, "Not found");
  }

  next();
};

module.exports = validateId;
