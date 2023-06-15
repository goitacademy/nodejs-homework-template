const {isValidObjectId} = require('mongoose');

const {HttpError} = require('../helper');

const isValidId = (req, res, next) => {
  const {contactId} = res.params;
  if(!isValidObjectId(contactId)){
    next(HttpError(400, `${contactId} is not valid id`))
  }
  next();
};

module.exports = isValidId;