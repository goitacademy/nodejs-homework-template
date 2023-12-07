// middlewares\validator.js

const { body, validationResult } = require("express-validator");

const validateBody = (schema) => {
  return [
    body().custom(async (value, { req }) => {
      try {
        await schema.validateAsync(req.body, { abortEarly: false });
        return true;
      } catch (error) {
        console.error("Validation error:", error.message);
        throw error;
      }
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error("Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

module.exports = { validateBody };
