const { isValidObjId } = require("mongoose");
const { cteateError } = require("../helpers");
const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjId(contactId)) {
    next(cteateError(400, `${contactId} is not valid`));
  }
  next();
};
module.exports = isValidId;
