const { isValidObjectId } = require("mongoose");

const { RequestError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  if (!result) {
    next(RequestError(404, `${contactId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
