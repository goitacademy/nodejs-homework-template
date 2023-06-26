const { HttpError } = require("../helpers");
// const { schema } = require("../schemas/contacts");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = `missing required ${error.details[0].context.label} field`;
      throw HttpError(400, message);
      }
      next()
  };
  return func;
};

const validateUpdateBody = (schema) => {
  const func = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      const message = "missing fields";
      throw HttpError(400, message);
    }
    const { error } = schema.validate(req.body);
    if (error) {
      console.log("error in update", error.details[0])
      const message = `missing required ${error.details[0].context.label} field`;
      throw HttpError(400, message);
    }
    next();
  };
  return func;
}

const validateFavorite = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = `missing field ${error.details[0].context.label}`;
      throw HttpError(400, message);
    }
    next();
  };
  return func;
};

const validateSubscription = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = `field ${error.details[0].context.label} is not valid`;
      throw HttpError(400, message);
    }
    next();
  };
  return func;
};

module.exports = {
  validateBody,
  validateUpdateBody,
  validateFavorite,
  validateSubscription,
};
