const { isValidObjectId } = require("mongoose");
const { HTTPError } = require("../helpers");

const validateID = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw HTTPError(400, `${contactId} is not valid id`);
  }
  next();
};

module.exports = { validateID };
