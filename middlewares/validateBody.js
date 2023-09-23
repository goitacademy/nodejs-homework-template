const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const foo = (req, _, next) => {
    const { error } = schema.validate(req.body);
    const errMessage = !Object.keys(req.body).length
      ? "missing fields"
      : error?.message.replace(/\"/g, "");

    if (error) next(HttpError(400, errMessage));

    next();
  };

  return foo;
};

module.exports = validateBody;
