const { HttpError } = require('../helpers');

const validate = schema => {
  const func = async (req, res, next) => {
    console.log(req.body);
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      next(HttpError(400, error.message));
    }
  };
  return func;
};

module.exports = validate;
