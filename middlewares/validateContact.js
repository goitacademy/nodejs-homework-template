const { HttpError } = require("../helpers");

const validateContact = (schema) => {
  const func = (req, _, next) => {
    if (Object.keys(req.body).length === 0) {
      if (req.method === "PATCH") {
        throw HttpError(400, "missing field favorite");
      }
      throw HttpError(400, `missing fields`);
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.details[0].message));
    }
    next();
  };
  return func;
};

module.exports = validateContact;
