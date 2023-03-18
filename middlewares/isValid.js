const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = new Error(`${contactId} is not valid id`);
    error.status = 400;
    next(error);
  }
  next();
};

module.exports = isValidId;
