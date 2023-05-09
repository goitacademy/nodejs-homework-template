const Joi = require("joi");
const httpError = require("../helpers/httpError");

const validateData = (req, __, next) => {
  const { error } = contactValidate(req.body);
  if (error) {
    const fieldWithError = error.details[0].path[0];
    const errorType = error.details[0].type;

    switch (errorType) {
      case "string.min":
        next(httpError(400, `${fieldWithError} must be at least 3 characters`));
        break;
      case "any.required":
        next(httpError(400, `missing required ${fieldWithError} field`));
        break;
      case "string.pattern.base":
        next(httpError(400, `please enter a valid ${fieldWithError}`));
        break;
      case "object.unknown":
        next(httpError(400, `property ${fieldWithError} is not allowed`));
        break;
      case "boolean.base":
        next(httpError(400, `${fieldWithError} must be a boolean`));
        break;
      default:
        break;
    }
    return;
  }
  next();
};

const contactValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .pattern(/^[A-Za-zА-Яа-яёЁ]+(?:[-'\s][A-Za-zА-Яа-яёЁ]+)*$/)
      .required(),
    email: Joi.string()
      .min(3)
      .pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .required(),
    phone: Joi.string()
      .min(3)
      .pattern(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
      )
      .required(),
    favorite: Joi.boolean(),
  });

  return schema.validate(data);
};

module.exports = validateData;
