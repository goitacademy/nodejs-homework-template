const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
    console.log("isValidId");

  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `ID : ${contactId} is not valid`));
  }
  next();
};

module.exports = isValidId;
