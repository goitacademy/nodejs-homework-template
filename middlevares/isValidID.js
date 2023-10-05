const { HttpErr } = require("../middlevares/error");
const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(HttpErr(400, `${contactId} is not a valid id`));
  }
  next();
};

module.exports = isValidId;
