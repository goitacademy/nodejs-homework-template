const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const foo = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) next(HttpError(400, "missing required name field"));

    next();
  };

  return foo;
};

module.exports = validateBody;
