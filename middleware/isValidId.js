const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw HttpError(400, { message: `${contactId} is not valid id` });
  }
  next();
};

module.exports = { isValidId };
