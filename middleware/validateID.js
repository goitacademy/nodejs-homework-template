const { isValidObjectId } = require("mongoose");
const { HTTPError } = require("../helpers");

const validateID = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw HTTPError(`${contactId} is not valid id`, 400);
  }
  next();
};

module.exports = { validateID };
