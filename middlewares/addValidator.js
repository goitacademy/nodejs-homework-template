const Joi = require("joi");
const HttpError = require("../helpers/HttpError");

const addValidator = (req, res, next) => {
  const { error } = validateData(req.body);
  if (error) {
    const fieldWithError = error.details[0].path[0];
    const errorType = error.details[0].type;

    switch (errorType) {
      case "string.min":
        next(HttpError(400, `${fieldWithError} must be at least 3 characters`));
        break;
      case "string.pattern.base":
        next(HttpError(400, `please enter a valid ${fieldWithError}`));
        break;
      case "object.unknown":
        next(HttpError(400, `property ${fieldWithError} is not allowed`));
        break;
      case "boolean.base":
        next(HttpError(400, `${fieldWithError} must be a boolean`));
        break;
      default:
        break;
    }
    return;
  }
  next();
};

const validateData = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
      .pattern(/^[A-Za-zА-Яа-яёЁ]+(?:[-'\s][A-Za-zА-Яа-яёЁ]+)*$/),
    email: Joi.string()
      .min(3)
      .required()
      .pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    phone: Joi.string()
      .min(3)
      .required()
      .pattern(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
      ),
    favorite: Joi.boolean(),
  });

  return schema.validate(data);
};

module.exports = addValidator;
