const { isValidObjectId } = require("mongoose-lean-getters");
const requestError = require("../helpers/requestError");
 
const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = requestError(400, `${contactId} is not correct id format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
