const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    const err = new HttpError(400, `${contactId} is not valid id`);

    next(err);
  }
  next();
};

module.exports = isValidId;
