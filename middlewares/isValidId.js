const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = RequestError(400, `${contactId} is not corrent contactId format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
