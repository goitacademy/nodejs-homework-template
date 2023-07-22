const { isValidObjectId } = require("mongoose");
const { ErrorHandling } = require("../helper/errorReq");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  if (!isValidObjectId(contactId)) {
    next(ErrorHandling(400, `${contactId} is not a valid id`));
  }
  next();
};
module.exports = { isValidId };
