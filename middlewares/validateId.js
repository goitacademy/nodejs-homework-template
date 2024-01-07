const { isValidObjectId } = require("mongoose");
const HTTPError = require("../helpers/HTTPError");

module.exports = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    res.status(400);
    throw HTTPError(400, `ID: ${contactId}, is not valid`);
  }
  
  next();
};
