const { isValidObjectId } = require("mongoose");

const { HttpErr } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpErr(400, `${contactId} is not valid id!`));
  }
  next();
};
module.exports = isValidId;
