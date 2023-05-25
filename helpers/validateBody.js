const Joi = require("joi");

const scheme = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "missing required phone field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
});

const validateBody = (req, res, next) => {
  const bodyLength = Boolean(Object.keys(req.body).length);
  if (!bodyLength) {
    const errors = new Error("missing fields");
    errors.status = 400;
    next(errors);
  }
  const { error } = scheme.validate(req.body);

  if (error) {
    const errors = new Error(error.message);
    errors.status = 400;
    next(errors);
  }
  next();
};

module.exports = { validateBody };
