// middelewares/validateSchemas.js
// const Joi = require("joi");

const validateSchemas = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({
        result: null,
        message,
      });
    }
  };
};

module.exports = validateSchemas;
