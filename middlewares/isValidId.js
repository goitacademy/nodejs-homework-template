const { isValidObjectId } = require('mongoose');
const { httpError } = require('../utils');

const isValidId = (req, _, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    next(httpError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
