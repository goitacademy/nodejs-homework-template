const HttpError = require("../helpers/HttpError");

const validateBodyPost = (datavalidator) => {
  const func = (req, res, next) => {
    const { error } = datavalidator(req.body);
    if (error) {
      next(
        HttpError(
          400,
          error.details[0].type === "any.required"
            ? `missing required ${error.details[0].context.label} field `
            : error.message
        )
      );
    }
    next();
  };
  return func;
};

const validateBodyPut = (datavalidator) => {
  const func = (req, res, next) => {
    const { error } = datavalidator(req.body);

    if (error) {
      next(
        HttpError(
          400,
          Object.keys(req.body).length === 0 ? "missing fields" : error.message
        )
      );
    }
    next();
  };
  return func;
};
const validateBodyPatch = (datavalidator) => {
  const func = (req, res, next) => {
    const { error } = datavalidator(req.body);

    if (error) {
      next(
        HttpError(
          400,
          Object.keys(req.body).length === 0
            ? "missing field favorite"
            : error.message
        )
      );
    }
    next();
  };
  return func;
};

module.exports = { validateBodyPost, validateBodyPut, validateBodyPatch };
