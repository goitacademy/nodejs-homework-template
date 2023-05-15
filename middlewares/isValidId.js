const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../utils/errors");

const isValidId = (req, res, next) => {
  const id = req.params.contactId;

  if (!isValidObjectId(id)) {
    throw new HttpError(400, `${id} is invalid ID`);
  }

  next();
};

module.exports = isValidId;
