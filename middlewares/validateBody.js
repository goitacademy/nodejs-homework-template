const { httpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log("req.body", req.body);
    console.log("next", next);
    if (error) {
      next(httpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
