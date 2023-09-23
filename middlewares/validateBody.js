const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const foo = (req, _, next) => {
    if (!Object.keys(req.body).length) {
      return next(HttpError(400, "missing fields"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      const requiredField = JSON.parse(
        error.message.replace(" is required", "")
      );

      return next(HttpError(400, `missing required ${requiredField} field`));
    }

    next();
  };

  return foo;
};

module.exports = validateBody;
