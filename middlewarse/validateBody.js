const { HttpError } = require("../helpers");

const validateBodyPost = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMesagge =
        error.message
          .split("is required")
          .join("")
          .split('"')
          .join("")
          .split(",")
          .toString() || "";

      next(HttpError(400, ` missing required ${errorMesagge} field`));
    }
    next();
  };
  return func;
};

const validateBodyPut = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMesagge = error.message
        .split("is required")
        .join("")
        .split('"')
        .join("")
        .split(",")
        .toString();
      next(HttpError(400, ` missing fields ${errorMesagge}`));
    }
    next();
  };
  return func;
};

const validateBodyPatch = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, "missing field favorite"));
    }
    next();
  };
  return func;
};

module.exports = {
  validateBodyPost,
  validateBodyPut,
  validateBodyPatch,
};
