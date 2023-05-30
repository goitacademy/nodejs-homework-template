const { isValidObjectId } = require("mongoose");

const { RequestError } = require("../helpers/RequestError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(RequestError(400, `${contactId} is not valid id`));
  }

  next();
};

module.exports = { isValidId };
