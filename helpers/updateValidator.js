const Joi = require("joi");

const validateUpdateData = (req, res, next) => {
  const bodyIsValid = updateContactValidate(req.body);
  if (bodyIsValid.error) {
    const fieldWithError = bodyIsValid.error.details[0].path[0];
    const errorType = bodyIsValid.error.details[0].type;

    switch (errorType) {
      case "string.min":
        res.status(400).json({
          message: `${fieldWithError} must be at least 3 characters`,
        });
        break;
      case "string.pattern.base":
        res.status(400).json({
          message: `please enter a valid ${fieldWithError}`,
        });
        break;
      default:
        break;
    }
    return;
  }
  next();
};

const updateContactValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .pattern(/^[A-Za-zА-Яа-яёЁ]+(?:[-'\s][A-Za-zА-Яа-яёЁ]+)*$/),
    email: Joi.string()
      .min(3)
      .pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    phone: Joi.string()
      .min(3)
      .pattern(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
      ),
  });

  return schema.validate(data);
};

module.exports = validateUpdateData;
