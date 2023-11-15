const Joi = require("joi");

const validateBody = (schema, errorMessage) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: errorMessage,
      });
    }

    next();
  };
};

const addValid = validateBody(
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    phone: Joi.string().required(),
  }),
  "missing required field"
);

const updateValid = validateBody(
  Joi.object({
    name: Joi.string(),
    email: Joi.string().email().lowercase(),
    phone: Joi.string(),
  }),
  "missing field"
);

const updateFavoriteValid = validateBody(
  Joi.object({
    favorite: Joi.boolean().required(),
  }),
  "missing field favorite"
);

module.exports = { addValid, updateValid, updateFavoriteValid };