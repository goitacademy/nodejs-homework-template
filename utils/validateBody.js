const {HttpError} = require('../helper/index')

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error)
    if (error) {
      next( HttpError(400, error.message));
    }
    next();
  };
  return func;
};
module.exports = validateBody;
