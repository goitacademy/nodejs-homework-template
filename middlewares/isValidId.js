const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);

  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `ID : ${contactId} is not valid`));
  }
  next();
};

module.exports = isValidId;
