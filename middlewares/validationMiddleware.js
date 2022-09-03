const Joi = require("joi");

const errorMessage = (message) => {
  switch (message) {
    case '"value" must have at least 1 key':
      return { message: "missing fields" };

    case '"name" is required':
      return { message: "missing required name field" };

    case '"email" is required':
      return { message: "missing required email field" };

    case '"phone" is required':
      return { message: "missing required phone field" };

    default:
      return { message: `${message}` };
  }
};

module.exports = {
  addContactValidation: (request, response, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(25).required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .required(),
    });

    const validationResult = schema.validate(request.body);
    if (validationResult.error) {
      return response
        .status(400)
        .json(errorMessage(validationResult.error.details[0].message));
    }

    next();
  },

  updateContactValidation: (request, response, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(25).optional(),
      email: Joi.string().email().optional(),
      phone: Joi.string()
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .optional(),
    }).min(1);

    const validationResult = schema.validate(request.body);
    if (validationResult.error) {
      return response
        .status(400)
        .json(errorMessage(validationResult.error.details[0].message));
    }

    next();
  },
};
