const { isValidObjectId } = require('mongoose');

const { Error } = require('../funcHelpers');

const isValid = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(Error(404, 'not found'));
  }
  next();
};

module.exports = isValid;
