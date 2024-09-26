const { HttpError } = require("../helpers");

const validateBody = (shema) => {
  const checkValidate = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "missing fields"));
      return;
    }

    const { error } = shema.validate(req.body);
    if (error) {
      error.details[0].type === "any.required"
        ? next(
            HttpError(400, `missing required ${error.details[0].path[0]} field`)
          )
        : next(HttpError(400, error.message));
    }
    next();
  };
  return checkValidate;
};

module.exports = validateBody;