const { isValidObjectId } = require("mongoose");
const { HttpError } = require('../helpers');

const isValid = (req, res, next) => {
    const { contactId } = req.params;
    console.log(req);
    if (!isValidObjectId(contactId))
      next(HttpError(400, `${contactId} is not valid ID`));
    next();
};

module.exports = isValid;
