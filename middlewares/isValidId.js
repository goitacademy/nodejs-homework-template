const { NotFound } = require("http-errors");
const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(NotFound(`${contactId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
