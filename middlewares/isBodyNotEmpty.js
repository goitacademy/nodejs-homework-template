// const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../helpers');
const { isEmpty } = require('lodash');
const isBodyNotEmpty = (errorMessage = 'Missing fields') => {
  const func = (req, res, next) => {
    if (isEmpty(req.body)) {
      next(HttpError({ status: 400, message: errorMessage }));
    }
    next();
  };

  return func;
};

module.exports = isBodyNotEmpty;
