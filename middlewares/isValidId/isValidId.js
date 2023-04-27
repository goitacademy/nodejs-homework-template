const { isValidObjectId } = require('mongoose');
const { httpErrorFunc } = require('../../helpers');

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(httpErrorFunc(400, `${id} is not a valid id`));
  }
  next();
};

module.exports = isValidId;
