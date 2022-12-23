const { BadRequest } = require('http-errors');
const validation = schema => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new BadRequest(error.message);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validation;
