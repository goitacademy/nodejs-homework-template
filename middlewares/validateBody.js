const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }
    const { error } = schema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.key;
      next(HttpError(400, `missing required ${missingField} field`));
    }
    next();
  };
  return func;
};

const validateBodyFavorite = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }

    next();
  };
};
module.exports = { validateBody, validateBodyFavorite };
