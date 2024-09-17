const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../utils/helpers/HttpError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  if (!isValidObjectId(contactId)) {
    return next(new HttpError(404, `${contactId} not valid id`));
  }
  next();
};

module.exports = isValidId;
