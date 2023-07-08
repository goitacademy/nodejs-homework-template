const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/HttpError");
const isValidId = (req, res, next) => {
  console.log(req);
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not valid id`));
  }
  next();
};
module.exports = isValidId;
