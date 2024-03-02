const { isValidObjectId } = require("mongoose");

const { HttpErrors } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(HttpErrors(400, `${contactId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
