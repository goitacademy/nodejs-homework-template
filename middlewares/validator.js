// middlewares/validator.js

const { body, validationResult } = require('express-validator');

const validateBody = (schema) => {
  return [
    body().custom((value, { req }) => {
      const result = schema.validate(req.body, { abortEarly: false });
      if (result.error) {
        throw new Error(result.error.details.map((err) => err.message).join(', '));
      }
      return true;
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

module.exports = { validateBody };
