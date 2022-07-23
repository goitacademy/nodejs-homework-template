const { createError } = require("../helpers");
const { schemas } = require("../models/contacts");

const validation = (schema) => (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(createError(400, "missing fields"));
    return;
  }

  const { error } = schema.validate(req.body);
  if (error) {
    const [details] = error.details;
    const { message, path } = details;
    const [fieldName] = path;
    if (details.type === "any.required") {
      next(createError(400, `missing required field ${fieldName}`));
      return;
    }
    next(createError(400, "Validation error, field " + message));
    return;
  }

  next();
};

const validateAddBody = validation(schemas.add);
const validateFavoriteBody = validation(schemas.updateFavorite);

module.exports = {
  validateAddBody,
  validateFavoriteBody,
};
