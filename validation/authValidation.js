const Joi = require('joi');

const authValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
  });

  schema
    .validateAsync(req.body)
    .then(_ => next())
    .catch(validationResult => {
      const massage = validationResult.details[0].message;
      return res.status(400).json({ massage });
    });
};

module.exports = authValidation;
