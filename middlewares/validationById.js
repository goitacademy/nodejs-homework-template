const { isValidObjectId } = require("mongoose");
const { requestError } = require("../utils");

const validationById = (req, _, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(requestError(404, `id: ${contactId}  not validate`));
  }
  next();
};

module.exports = validationById;
