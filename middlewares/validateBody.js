const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const foo = (req, _, next) => {
    const { method, body } = req;
    const countKeys = Object.keys(body).length;

    if (!countKeys && method !== "PATCH") {
      next(HttpError(400, "missing fields"));
    }

    const { error } = schema.validate(body);
    if (error) next(HttpError(400, error.message));

    next();
  };

  return foo;
};

module.exports = validateBody;
