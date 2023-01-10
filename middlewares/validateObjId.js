const mongoose = require('mongoose');
const { httpError } = require('../utils');

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    next(httpError(404));
  }
  next();
};

module.exports = validateId;
