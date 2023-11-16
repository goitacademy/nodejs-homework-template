const { HttpError } = require("../helpers/index");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) {
      console.log(error);
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
