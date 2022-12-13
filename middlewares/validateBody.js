const { BadRequest } = require('http-errors');
// const { joiSchema } = require('../schemas/contacts');

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      next( new BadRequest('message: missing fields'));
    }
    next();
  };
  return func;
};

module.exports = validateBody;