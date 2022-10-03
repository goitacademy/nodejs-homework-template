const { isValidObjectId } = require("mongoose");

const { RequesError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  if (!result) {
    next(RequesError(404, `${contactId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
