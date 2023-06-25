const { BadRequest } = require('http-errors');

const validation = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw BadRequest(`missing ${error.message} field`);
    }
    next();
  };
};

module.exports = validation;
