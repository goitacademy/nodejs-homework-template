const { HttpError } = require("../helpers/HttpError");

const validationBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }
    next();
  };
};

const validationById = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      throw new HttpError(400, error.message);
    }
    next();
  };
};

const validationFavorite = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }
    next();
  };
};

module.exports = {
  validationBody,
  validationById,
  validationFavorite,
};
