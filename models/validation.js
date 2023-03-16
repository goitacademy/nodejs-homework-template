const Joi = require("joi");


const newContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(15).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(9).max(15).required(),
});


const contactUpdateSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(15).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.string().min(9).max(15).optional(),
}).min(1);


const validateContact = (req, res, next) => {
  const { error, value } = newContactSchema.validate(req.body);

  req.error = { error: null, value };
  if (error) {
    req.error = { error: error.details[0].message, value: null };
  }
  next();
};

const validateUpdateContact = (req, res, next) => {
  const { error, value } = validateContact(contactUpdateSchema, req.body);

  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  next()
};

module.exports = { validateContact, validateUpdateContact };