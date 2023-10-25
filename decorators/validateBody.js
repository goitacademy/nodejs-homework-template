const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  return func;
};
