const { isValidObjectId } = require('mongoose');

const { createError } = require('../helpers');

const validationById = id => {
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    throw createError(404, `Contact with id:${id} not found`);
  }
};

module.exports = validationById;
