const { HttpError } = require("../helpers");

const validateBody = (schema, message) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) next(new HttpError(400, (error.message = message)));
    next();
  };
  return func;
};

module.exports = validateBody;
