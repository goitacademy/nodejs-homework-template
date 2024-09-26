const { isValidObjectId } = require("mongoose");
const { requestError } = require("../utils");

const validateId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(requestError(400, `${contactId} is not valid id`));
  }
  next();
};

module.export = validateId;
