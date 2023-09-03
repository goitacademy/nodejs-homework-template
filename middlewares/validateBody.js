const { httpError } = require("../utils");

const validateBody = (scheme) => {
  const foo = (req, _, next) => {
    const { error } = scheme.validate(req.body);
    if (error) {
      next(httpError(400, error.message));
    }
    next();
  };
  return foo;
};

module.exports = validateBody
