const { isValidObjectId } = require('mongoose');
const { BadRequest } = require('http-errors');

const isValidId = (req, _, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    const error = BadRequest(
      `format of this id:${id} is not correct`
    );
    next(error);
  }
  next();
};

module.exports = isValidId;
