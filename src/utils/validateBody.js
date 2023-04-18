const { HttpError } = require("../helpers");

const validatePostBody = (schema) => {
  const middlewareFunc = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return middlewareFunc;
};

const validatePutBody = (schema) => {
  const middlewareFunc = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "missing fields"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return middlewareFunc;
};

const validatePatchBody = (schema) => {
  const middlewareFunc = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "missing field favorite"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(404, "Not found"));
    }
    next();
  };

  return middlewareFunc;
};

module.exports = {
  validatePostBody,
  validatePutBody,
  validatePatchBody,
};
