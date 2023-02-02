const { isValidObjectId } = require('mongoose');
const httpError = require('http-errors');

const isValidId = (req, _, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    const error = httpError(
      400,
      `format of this id:${id} is not correct`
    );
    next(error);
  }
  next();
};

module.exports = isValidId;
