const { isValidObjectId } = require("mongoose");
const { createError } = require("../helpers");

const isVaidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const result = isValidObjectId(contactId);
  if (!result) {
    const error = createError(400, "Invalid id");
    next(error);
  }
  next();
};

module.exports = isVaidId;
