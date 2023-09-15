const { HttpError } = require('../helpers');

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0]);
      next(new HttpError(400, error.details[0].message));
    }
    next();
  };
};

module.exports = validateBody;
