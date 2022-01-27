const { NotFound } = require("http-errors");

const throwNotFound = id => {
  throw new NotFound(`Contact with id=${id} not found`);
};

module.exports = throwNotFound;
