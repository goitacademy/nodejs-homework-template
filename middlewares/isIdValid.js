const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

const isIdValid = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw HttpError(400, `${id} is not valid id`);
  }
  next();
};

module.exports = isIdValid;
