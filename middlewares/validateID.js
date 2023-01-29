const { isValidObjectId } = require('mongoose');
const { httpError } = require('@root/helpers');

const validateID = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) next(httpError(404, `Invalid entity ID: ${id}`));

  next();
};

module.exports = validateID;
