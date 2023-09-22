const { isValidObjectId } = require("mongoose");
const httpError = require("../helpers/HttpErr");

const validID = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(httpError(404, `${contactId} is not a valid`));
  }

  next();
};

module.exports = validID;
