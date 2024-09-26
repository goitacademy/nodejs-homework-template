const { HttpError } = require("../helpers");

const validateBodyPost = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const errorMesagge = error.message
      .split("is required")
      .join("")
      .split('"')
      .join("")
      .split(",")
      .toString();

    if (error) {
      next(HttpError(400, ` missing required ${errorMesagge}`));
    }
    next();
  };
  return func;
};

const validateBodyPut = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const errorMesagge = error.message
      .split("is required")
      .join("")
      .split('"')
      .join("")
      .split(",")
      .toString();

    if (error) {
      next(HttpError(400, ` missing fields ${errorMesagge}`));
    }
    next();
  };
  return func;
};

module.exports = {
  validateBodyPost,
  validateBodyPut,
};
