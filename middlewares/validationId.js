const { isValidObjectId } = require("mongoose");

const { RequestError } = require("../utils");

const validationId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(RequestError(400, `${contactId} this id is invalid`));
  }

  next();
};

module.exports = validationId;
