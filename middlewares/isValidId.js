const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = HttpError(400, `${contactId} is not corrent id format.`);
    next(error);
  }
  next();
};

module.exports = isValidId;