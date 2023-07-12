const { ApiError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    console.log("req.body :>> ", req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      next(ApiError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
