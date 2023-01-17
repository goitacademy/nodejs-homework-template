const Joi = require("joi");
const {HttpError} = require("../helpers/error-func")

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }

    return next();
  };
}

const contactSchema = Joi.object({
    name: Joi.string().required().messages({
    "any.required": "missing required name field!",
    }),
    email: Joi.string().email().required().messages({
    "any.required": "missing required email field!",
    }),
    phone: Joi.string().pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
    .required().messages({"any.required": "missing required phone field!",
    }),
});

const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/),
});

module.exports = {
  validateBody,
  contactSchema,
  updateContactSchema,
};