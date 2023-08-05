const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
});

const validateData = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing fields" });
  }

  const { error } = addSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: `${error.details[0].message}` });
  }

  next();
};

module.exports = validateData;
