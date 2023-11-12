const { HTTPError } = require("../helpers");

const validateBody = (schema) => {
  const foo = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HTTPError(error.message, 400));
    }
    next();
  };
  return foo;
};
module.exports = { validateBody };
