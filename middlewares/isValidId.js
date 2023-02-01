const { isValidObjectId } = require('mongoose');
const RequestError = require('../helpers/requestError');

const isValidId = (req, _, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    const error = RequestError(
      400,
      `format of this id:${id} is not correct`
    );
    next(error);
  }
  next();
};

module.exports = isValidId;
