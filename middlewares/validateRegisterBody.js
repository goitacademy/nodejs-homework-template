const { HttpError } = require("../helpers");

const validateRegisterBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};
module.exports = validateRegisterBody;
