const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../utils");

const isValidId = async (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);

  if (!result) {
    next(HttpError(400, `${contactId} is not valid`));
  }
  next();
};

module.exports = isValidId;
