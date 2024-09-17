const { httpError } = require('../helpers');

const validation = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (!Object.keys(req.body).length) {
        next(httpError(400, `missing fields`));
      }
      const [missingValue] = error.details.map(err => err.context.label);
      next(httpError(400, `missing required ${missingValue} field`));
    }
    next();
  };
  return func;
};

module.exports = validation;
